"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Order {
    id: string;
    total_amount: number;
    status: string;
    created_at: string;
    user_id: string;
}

export default function AdminOrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [dbError, setDbError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchOrders();
        }
    }, [user, authLoading, router]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error: any) {
            console.error('Error fetching orders:', error);
            if (error.code === '42P01') { // undefined_table
                setDbError("Table 'orders' does not exist yet.");
            } else {
                setDbError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || (loading && user && !dbError)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-muted/10 pb-20">
            <div className="bg-background border-b">
                <div className="container py-8">
                    <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-heading font-bold mb-2">Orders</h1>
                    <p className="text-muted-foreground">Track purchases and fulfillment.</p>
                </div>
            </div>

            <div className="container py-8">
                {dbError ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center text-amber-800">
                        <AlertTriangle className="h-10 w-10 mx-auto mb-4 opacity-50" />
                        <h2 className="text-xl font-bold mb-2">Database Setup Required</h2>
                        <p className="mb-4">{dbError}</p>
                        <p className="text-sm opacity-80 max-w-lg mx-auto">
                            Please run the SQL snippets provided in the implementation plan to create the 'orders' table.
                        </p>
                    </div>
                ) : (
                    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-muted/5 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                                    {order.id.slice(0, 8)}...
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    ₹{order.total_amount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={order.status === 'completed' ? "default" : "secondary"}>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
