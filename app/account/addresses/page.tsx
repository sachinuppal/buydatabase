"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressesPage() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-heading">Addresses</h2>
            <p className="text-muted-foreground">The following addresses will be used on the checkout page by default.</p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Billing Address */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-bold">Billing Address</h3>
                        <Button variant="link" className="h-auto p-0 text-primary">Edit</Button>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1 italic">
                        <p className="not-italic font-medium text-foreground">Sachin New</p>
                        <p>123 Startup Hub,</p>
                        <p>Koramangala 4th Block,</p>
                        <p>Bangalore, 560034</p>
                        <p>Karnataka</p>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-bold">Shipping Address</h3>
                        <Button variant="link" className="h-auto p-0 text-primary">Add</Button>
                    </div>
                    <p className="text-sm text-muted-foreground italic">You have not set up this type of address yet.</p>
                </div>
            </div>
        </div>
    );
}
