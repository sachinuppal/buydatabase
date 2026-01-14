"use client";

import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Plus,
    Search,
    Loader2,
    FileSpreadsheet,
    MoreHorizontal,
    RefreshCw,
    DownloadCloud
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ALL_PACKAGES } from "@/data/packages";

export default function AdminProductsPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                if (error.code === '42P01') {
                    setProducts([]);
                } else {
                    console.error(error);
                }
            } else {
                setProducts(data || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        if (!confirm(`This will import missing products from the static 'packages.ts' file into the database. Continue?`)) return;

        setSyncing(true);
        try {
            // 1. Get existing slugs
            const existingSlugs = new Set(products.map(p => p.slug));

            // 2. Filter new packages
            const newPackages = ALL_PACKAGES.filter(p => !existingSlugs.has(p.slug));

            if (newPackages.length === 0) {
                alert("Database is already up to date! No new packages found.");
                setSyncing(false);
                return;
            }

            // 3. Map to DB Schema
            const dbRows = newPackages.map(p => ({
                slug: p.slug,
                title: p.title,
                description: `Category: ${p.category}. Audience: ${p.audience.role}.`,
                price_inr: p.price_inr,
                sale_price_inr: p.sale_price_inr,
                currency: 'INR',

                region: p.geo.country,
                city: p.geo.city || '',
                role: p.audience.role,
                industry: p.industry,
                seniority: p.audience.group,

                records_count: p.record_count_estimate,
                delivery_time: p.delivery_type === 'instant' ? 'Instant' : '24-48 Hours',
                delivery_type: p.delivery_type,
                format: p.formats.join('/'),

                // Default asset URL empty
                asset_url: '',

                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }));

            // 4. Bulk Insert
            const { error } = await supabase.from('products').insert(dbRows);

            if (error) throw error;

            alert(`Successfully imported ${dbRows.length} products!`);
            fetchProducts();

        } catch (error: any) {
            console.error(error);
            alert(`Sync failed: ${error.message}`);
        } finally {
            setSyncing(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Products & Delivery</h1>
                    <p className="text-muted-foreground">Manage dataset catalog and download links.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSync} disabled={syncing || loading}>
                        {syncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DownloadCloud className="mr-2 h-4 w-4" />}
                        Sync Database
                    </Button>
                    <Link href="/admin/products/new">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> New Product
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground ml-auto">
                        <Badge variant="secondary" className="font-mono">{products.length} Items</Badge>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                            <tr>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3 w-32">Price</th>
                                <th className="px-6 py-3 w-32">Delivery</th>
                                <th className="px-6 py-3 w-40">Asset Link</th>
                                <th className="px-6 py-3 w-20 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        {products.length === 0 ? "No products found. Use 'Sync Database' to import catalog." : "No matches found."}
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{p.title}</div>
                                            <div className="text-xs text-muted-foreground font-mono mt-0.5">{p.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            ₹{p.sale_price_inr.toLocaleString()}
                                            {p.price_inr > p.sale_price_inr && (
                                                <span className="text-xs text-muted-foreground line-through ml-2">₹{p.price_inr}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={p.delivery_type === 'instant' ? "bg-green-50 text-green-700 border-green-200" : ""}>
                                                {p.delivery_type || 'Manual'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            {p.asset_url ? (
                                                <div className="flex items-center gap-2 text-blue-600">
                                                    <FileSpreadsheet className="h-4 w-4" />
                                                    <span className="text-xs font-medium uppercase tracking-wider">Linked</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">No asset</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/products/${p.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
