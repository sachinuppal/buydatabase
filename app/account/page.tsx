"use client";

import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
    const { user, signOut } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Good Morning, {user?.email?.split('@')[0]}!</h2>
                <div className="prose text-muted-foreground">
                    <p>
                        From your account dashboard you can view your <Link href="/account/orders" className="text-primary hover:underline">recent orders</Link>,
                        manage your <Link href="/account/addresses" className="text-primary hover:underline">shipping and billing addresses</Link>,
                        and <Link href="/account/details" className="text-primary hover:underline">edit your password and account details</Link>.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Link href="/account/orders" className="block group">
                    <div className="border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center text-center gap-2 bg-muted/20 hover:bg-background">
                        <span className="text-lg font-bold group-hover:text-primary">Orders</span>
                        <span className="text-xs text-muted-foreground">Check full history</span>
                    </div>
                </Link>
                <Link href="/account/downloads" className="block group">
                    <div className="border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center text-center gap-2 bg-muted/20 hover:bg-background">
                        <span className="text-lg font-bold group-hover:text-primary">Downloads</span>
                        <span className="text-xs text-muted-foreground">Access purchased data</span>
                    </div>
                </Link>
                <Link href="/account/addresses" className="block group">
                    <div className="border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center text-center gap-2 bg-muted/20 hover:bg-background">
                        <span className="text-lg font-bold group-hover:text-primary">Addresses</span>
                        <span className="text-xs text-muted-foreground">Manage billing info</span>
                    </div>
                </Link>
            </div>

            <div className="pt-4">
                <Link href="/account/details">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Edit Account Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
