"use client";

import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/auth-context";

interface PurchasedItem {
    id: string;
    package_title: string;
    created_at: string;
    // We could join with package details later for more info
}

export default function DownloadsPage() {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState<PurchasedItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            fetchDownloads();
        }
    }, [user, authLoading]);

    const fetchDownloads = async () => {
        try {
            // Fetch all order items where the parent order belongs to the user
            const { data, error } = await supabase
                .from('order_items')
                .select(`
                    id,
                    package_title,
                    created_at,
                    orders!inner(user_id)
                `)
                .eq('orders.user_id', user!.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Transform data to flat structure
            const flatItems = data.map((item: any) => ({
                id: item.id,
                package_title: item.package_title,
                created_at: item.created_at
            }));

            setItems(flatItems);
        } catch (error) {
            console.error("Error fetching downloads:", error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-heading">Downloads</h2>
            <p className="text-muted-foreground">Access your purchased datasets here.</p>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                <FileSpreadsheet className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">{item.package_title}</h3>
                                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                                    <span>Purchased: {new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="shrink-0 gap-2">
                            <Download className="h-4 w-4" /> Download CSV
                        </Button>
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground mb-4">No downloads available yet.</p>
                    <Button variant="outline" onClick={() => window.location.href = '/datasets'}>Browse Datasets</Button>
                </div>
            )}
        </div>
    );
}
