"use client";

import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

interface Order {
    id: string;
    created_at: string;
    status: string;
    total_amount: number;
    // We can add order_items later if needed for a details view
}

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            fetchOrders();
        }
    }, [user, authLoading]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user!.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-heading">Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground mb-4">No order has been made yet.</p>
                    <a href="/datasets">
                        <Button>Browse Products</Button>
                    </a>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 uppercase tracking-wider text-xs font-bold text-muted-foreground border-b border-t">
                            <tr>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-muted/5">
                                    <td className="px-4 py-4 font-bold text-primary">
                                        #{order.id.slice(0, 8)}
                                    </td>
                                    <td className="px-4 py-4 text-muted-foreground">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 font-medium">
                                        ₹{order.total_amount.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" className="h-8 text-xs">View</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
