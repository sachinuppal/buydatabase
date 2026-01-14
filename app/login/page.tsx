"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            alert(error.message);
        } else {
            setSent(true);
        }
        setLoading(false);
    };

    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
                <div className="max-w-md w-full bg-card border rounded-xl p-8 shadow-sm text-center">
                    <div className="mx-auto bg-green-100 text-green-600 rounded-full h-16 w-16 flex items-center justify-center mb-6">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Check your email</h1>
                    <p className="text-muted-foreground mb-6">
                        We sent a magic link to <span className="font-bold text-foreground">{email}</span>.
                        <br />Click the link to sign in.
                    </p>
                    <Button variant="outline" onClick={() => setSent(false)}>
                        Use a different email
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link href="/" className="font-heading font-bold text-2xl tracking-tight">BuyDatabase.ai</Link>
                </div>

                <div className="bg-card border rounded-xl p-8 shadow-sm">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Sign in to access your library and downloads
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending Link...
                                </>
                            ) : (
                                <>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Sign in with Magic Link
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        Don't have an account? It will be created automatically.
                    </div>
                </div>
            </div>
        </div>
    );
}
