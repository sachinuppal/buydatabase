"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Users, ShoppingCart, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Stats State
    const [stats, setStats] = useState({
        leads: 0,
        orders: 0,
        revenue: 0
    });
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchStats();
        }
    }, [user, loading, router]);

    const fetchStats = async () => {
        setFetching(true);
        try {
            // 1. Leads Count
            const { count: leadsCount } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true });

            // 2. Orders Count (All)
            const { count: ordersCount } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true });

            // 3. Revenue (Sum of completed orders)
            const { data: revenueData } = await supabase
                .from('orders')
                .select('total_amount')
                .eq('status', 'completed');

            const totalRevenue = revenueData?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;

            setStats({
                leads: leadsCount || 0,
                orders: ordersCount || 0,
                revenue: totalRevenue
            });

        } catch (e) {
            console.error("Failed to fetch admin stats", e);
        } finally {
            setFetching(false);
        }
    };

    if (loading || fetching) {
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
                    <h1 className="text-3xl font-heading font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Overview of platform performance.</p>
                </div>
            </div>

            <div className="container py-8">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Leads Card */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wide">Total Leads</h3>
                            <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="text-3xl font-black font-heading">{stats.leads}</div>
                        <p className="text-xs text-muted-foreground mt-2">Life-time leads captured</p>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wide">Total Orders</h3>
                            <ShoppingCart className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="text-3xl font-black font-heading">{stats.orders}</div>
                        <p className="text-xs text-muted-foreground mt-2">All time orders</p>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wide">Revenue</h3>
                            <DollarSign className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="text-3xl font-black font-heading">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.revenue)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Total revenue collected</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/admin/leads" className="group block">
                        <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Manage Leads</h3>
                                <p className="text-muted-foreground">View and export all lead capture submissions from the marketplace.</p>
                            </div>
                            <div className="mt-6 flex items-center text-sm font-bold text-primary">
                                View Leads <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/admin/orders" className="group block">
                        <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">View Orders</h3>
                                <p className="text-muted-foreground">Track purchase history and fulfillment status.</p>
                            </div>
                            <div className="mt-6 flex items-center text-sm font-bold text-primary">
                                View Orders <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
