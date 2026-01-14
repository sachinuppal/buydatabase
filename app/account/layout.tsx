"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
    LayoutDashboard,
    ShoppingBag,
    Download,
    MapPin,
    User,
    LogOut,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut, user, loading } = useAuth();

    // Protect the route
    React.useEffect(() => {
        if (!loading && !user) {
            router.push("/login"); // Or redirect to home
        }
    }, [user, loading, router]);

    const navigation = [
        { name: "Dashboard", href: "/account", icon: LayoutDashboard },
        { name: "Buy Data", href: "/account/buy-data", icon: Zap },
        { name: "Orders", href: "/account/orders", icon: ShoppingBag },
        { name: "Downloads", href: "/account/downloads", icon: Download },
        { name: "Addresses", href: "/account/addresses", icon: MapPin },
        { name: "Account Details", href: "/account/details", icon: User },
    ];

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    if (loading) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-muted/10 pb-20 pt-10">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold uppercase tracking-wider">My Account</h1>
                </div>

                <div className="grid md:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="space-y-1">
                        <div className="flex items-center gap-3 p-4 mb-6 bg-card border rounded-xl shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{user?.email}</p>
                                <p className="text-xs text-muted-foreground">Customer</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:bg-card hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="bg-card border rounded-xl shadow-sm p-6 md:p-8 min-h-[500px]">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
