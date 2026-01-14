"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Download, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="max-w-md w-full bg-card border rounded-2xl p-8 shadow-lg text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto bg-green-100 text-green-600 rounded-full h-20 w-20 flex items-center justify-center mb-6"
                >
                    <CheckCircle className="h-10 w-10" />
                </motion.div>

                <h1 className="text-3xl font-bold font-heading mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-8">
                    Thank you for your purchase. We've sent a confirmation email with your receipt.
                </p>

                <div className="space-y-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
                        <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                            Your Data is Ready
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            You can access your purchased datasets immediately in your library.
                        </p>
                    </div>

                    <Link href="/my-library" className="block w-full">
                        <Button className="w-full gap-2" size="lg">
                            <Download className="h-4 w-4" /> Go to My Library
                        </Button>
                    </Link>

                    <Link href="/datasets" className="block w-full">
                        <Button variant="outline" className="w-full">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
