"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";

export default function AccountDetailsPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8 max-w-xl">
            <h2 className="text-2xl font-bold font-heading">Account Details</h2>

            <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name *</Label>
                        <Input id="firstName" placeholder="First Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name *</Label>
                        <Input id="lastName" placeholder="Last Name" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="displayName">Display name *</Label>
                    <Input id="displayName" placeholder="Display Name" />
                    <p className="text-xs text-muted-foreground">This will be how your name will be displayed in the account section and in reviews</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email address *</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ''} disabled readOnly className="bg-muted" />
                </div>

                <div className="border-t pt-6 space-y-6">
                    <h3 className="font-bold text-lg">Password Change</h3>

                    <div className="space-y-2">
                        <Label htmlFor="currentPass">Current password (leave blank to leave unchanged)</Label>
                        <Input id="currentPass" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPass">New password (leave blank to leave unchanged)</Label>
                        <Input id="newPass" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPass">Confirm new password</Label>
                        <Input id="confirmPass" type="password" />
                    </div>
                </div>

                <Button type="submit" size="lg">Save Changes</Button>
            </form>
        </div>
    );
}
