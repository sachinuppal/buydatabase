"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Assuming we might need to implement Sheet if not present.
// Checking ui folder previously, "sheet.tsx" was NOT in the list.
// So I will implement a custom Slide-over Drawer for now to avoid large dependency install.

export function CartDrawer() {
    const { items, removeItem, cartTotal, itemCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(true)}
            >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-background">
                        {itemCount}
                    </span>
                )}
            </Button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] bg-background border-l shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b flex items-center justify-between bg-muted/10">
                        <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-primary" />
                            Your Cart ({itemCount})
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground flex flex-col items-center">
                                <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                                <p>Your cart is empty.</p>
                                <Button variant="link" onClick={() => setIsOpen(false)}>Continue Shopping</Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground font-bold border shrink-0">
                                            {item.category}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm leading-tight line-clamp-2">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">{item.record_count_estimate} Records</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-bold text-primary">₹{item.sale_price_inr.toLocaleString()}</span>
                                                <button
                                                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t bg-muted/10">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                <Button size="lg" className="w-full font-bold">
                                    Checkout Now
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
