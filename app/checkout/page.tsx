"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, IndianRupee, Loader2, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, cartTotal, removeItem, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [guestEmail, setGuestEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // Calculate with GST
    const gstAmount = Math.round(cartTotal * 0.18);
    const totalWithGst = cartTotal + gstAmount;

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                setIsLoggedIn(true);
                setUserEmail(data.session.user.email || null);
                setUserId(data.session.user.id);
            }
        };
        checkAuth();
    }, []);

    if (items.length === 0) {
        return (
            <div className="container py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Add some data packages to get started.</p>
                <Link href="/datasets">
                    <Button>Browse Marketplace</Button>
                </Link>
            </div>
        );
    }

    const handleRazorpayPayment = async () => {
        // Validate email
        const emailToUse = isLoggedIn ? userEmail : guestEmail;
        if (!emailToUse || !emailToUse.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {

            // 2. Create Razorpay Order
            const orderRes = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalWithGst,
                    receipt: `order_${Date.now()}`,
                    notes: {
                        user_id: userId || 'guest',
                        email: emailToUse,
                        items_count: items.length
                    }
                })
            });

            const orderData = await orderRes.json();

            if (!orderData.success) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // 3. Open Razorpay Checkout
            const options = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'BuyDatabase.ai',
                description: `${items.length} Dataset${items.length > 1 ? 's' : ''}`,
                order_id: orderData.order_id,
                prefill: {
                    email: emailToUse
                },
                theme: {
                    color: '#3b82f6'
                },
                handler: async function (response: any) {
                    // 4. Verify Payment
                    setLoading(true);

                    const verifyRes = await fetch('/api/payments/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: items.map(item => ({
                                id: item.id,
                                slug: item.slug,
                                title: item.title,
                                sale_price_inr: item.sale_price_inr
                            })),
                            userId: userId || 'guest',
                            userEmail: emailToUse,
                            totalAmount: totalWithGst
                        })
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        clearCart();
                        router.push("/checkout/success");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                    setLoading(false);
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error: any) {
            console.error("Payment Error:", error);
            alert("Payment failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setScriptLoaded(true)}
            />

            <div className="bg-muted/30 min-h-screen pb-20">
                <div className="container pt-10 pb-20 max-w-4xl mx-auto">
                    <Link href="/datasets" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Marketplace
                    </Link>

                    <h1 className="text-3xl font-heading font-bold mb-8">Secure Checkout</h1>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Order Summary - Left */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Email Section */}
                            <div className="bg-card border rounded-xl p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <h2 className="font-bold">Delivery Email</h2>
                                </div>
                                {isLoggedIn ? (
                                    <div className="text-sm">
                                        <p className="text-muted-foreground">Sending to:</p>
                                        <p className="font-medium">{userEmail}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Enter your email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@company.com"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Your download links will be sent to this email.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b bg-slate-50">
                                    <h2 className="font-bold">Order Summary</h2>
                                </div>
                                <div className="divide-y">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-4 flex justify-between items-center group">
                                            <div className="flex-1 pr-4">
                                                <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">Digital Dataset</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-semibold">₹{item.sale_price_inr.toLocaleString()}</span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white border rounded-lg">
                                    <Lock className="h-5 w-5 text-green-600" />
                                    <div className="text-sm">
                                        <p className="font-medium">Secure Payment</p>
                                        <p className="text-muted-foreground text-xs">256-bit SSL encryption</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white border rounded-lg">
                                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                                    <div className="text-sm">
                                        <p className="font-medium">Instant Delivery</p>
                                        <p className="text-muted-foreground text-xs">Download immediately</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Card - Right */}
                        <div className="lg:col-span-2">
                            <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
                                <h3 className="font-bold text-lg mb-6">Payment Details</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">GST (18%)</span>
                                        <span>₹{gstAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold pt-3 border-t">
                                        <span>Total</span>
                                        <span className="flex items-center">
                                            <IndianRupee className="h-5 w-5" />
                                            {totalWithGst.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full text-base"
                                    onClick={handleRazorpayPayment}
                                    disabled={loading || !scriptLoaded}
                                >
                                    {loading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                                    ) : (
                                        <>Pay ₹{totalWithGst.toLocaleString()}</>
                                    )}
                                </Button>

                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <img src="https://cdn.razorpay.com/static/assets/logo/payment.svg" alt="Razorpay" className="h-6" />
                                </div>

                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
