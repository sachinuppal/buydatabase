"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    ArrowLeft,
    Settings,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();

    // Protect the route
    React.useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const navigation = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Products & Delivery", href: "/admin/products", icon: Package },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Leads", href: "/admin/leads", icon: Users },
    ];

    if (loading) return null;

    return (
        <div className="min-h-screen bg-muted/10">
            {/* Top Bar */}
            <header className="bg-slate-900 text-white h-16 flex items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-2 font-bold text-lg mr-8">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    Admin Console
                </div>
                <div className="flex-1" />
                <Link href="/account" className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Exit to App
                </Link>
            </header>

            <div className="flex min-h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r hidden md:block shrink-0">
                    <div className="p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    )}
                                >
                                    <item.icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "text-slate-400")} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-4 mt-auto border-t">
                        <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500">
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="truncate w-full">
                                <p className="font-medium text-slate-900 truncate">{user?.email}</p>
                                <p className="text-xs">Administrator</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
