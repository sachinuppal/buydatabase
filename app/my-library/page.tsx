"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText, Search, Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

interface PurchasedItem {
    id: string;
    order_id: string;
    package_id: string;
    package_title: string;
    price: number;
    created_at: string;
    asset_url?: string;
}

export default function MyLibraryPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?next=/my-library');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user) {
            fetchPurchases();
        }
    }, [user]);

    const fetchPurchases = async () => {
        try {
            // Get all orders for this user
            const { data: orders, error: ordersError } = await supabase
                .from('orders')
                .select('id')
                .eq('user_id', user?.id)
                .eq('status', 'completed');

            if (ordersError) throw ordersError;

            if (!orders?.length) {
                setPurchases([]);
                setLoadingData(false);
                return;
            }

            const orderIds = orders.map(o => o.id);

            // Get order items for these orders
            const { data: orderItems, error: itemsError } = await supabase
                .from('order_items')
                .select('*')
                .in('order_id', orderIds)
                .order('created_at', { ascending: false });

            if (itemsError) throw itemsError;

            // Get asset URLs from products
            const packageIds = [...new Set(orderItems?.map(i => i.package_id) || [])];
            const { data: products } = await supabase
                .from('products')
                .select('slug, asset_url')
                .in('slug', packageIds);

            const assetMap: Record<string, string> = {};
            products?.forEach(p => {
                if (p.asset_url) assetMap[p.slug] = p.asset_url;
            });

            // Merge asset URLs into order items
            const enrichedItems = (orderItems || []).map(item => ({
                ...item,
                asset_url: assetMap[item.package_id]
            }));

            setPurchases(enrichedItems);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        } finally {
            setLoadingData(false);
        }
    };

    if (loading || loadingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    const filteredItems = purchases.filter(item =>
        item.package_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-muted/10 pb-20">
            <div className="bg-background border-b">
                <div className="container py-8">
                    <h1 className="text-3xl font-heading font-bold mb-2">My Library</h1>
                    <p className="text-muted-foreground">Manage and download your purchased datasets.</p>
                </div>
            </div>

            <div className="container py-8">
                {/* Toolbar */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search library..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Badge variant="secondary" className="font-mono">
                        {purchases.length} Dataset{purchases.length !== 1 ? 's' : ''}
                    </Badge>
                </div>

                {/* Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid gap-4">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="bg-card border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                                <div className="flex gap-4 items-start">
                                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 text-primary">
                                        <Package className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-snug">{item.package_title}</h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                            <span>Purchased: {new Date(item.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                                            <span>•</span>
                                            <span>₹{item.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {item.asset_url ? (
                                    <a href={item.asset_url} target="_blank" rel="noopener noreferrer">
                                        <Button className="gap-2 shrink-0">
                                            <Download className="h-4 w-4" /> Download
                                        </Button>
                                    </a>
                                ) : (
                                    <Button variant="outline" className="gap-2 shrink-0" disabled>
                                        <FileText className="h-4 w-4" /> Processing...
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : purchases.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-bold text-lg mb-2">No purchases yet</h3>
                        <p className="text-muted-foreground mb-6">Your purchased datasets will appear here.</p>
                        <Link href="/datasets">
                            <Button>Browse Datasets</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
                        <p className="text-muted-foreground">No datasets found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
