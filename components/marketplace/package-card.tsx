import Link from 'next/link';
import { Package } from '@/types/package';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap, Clock, FileText } from 'lucide-react';
import { useCart } from "@/context/cart-context";
import { useState } from "react";

interface PackageCardProps {
    pkg: Package;
}

// ... imports

export function PackageCard({ pkg }: PackageCardProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const isSale = pkg.sale_price_inr < pkg.price_inr;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        addItem(pkg);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Parse badge count from image_prompt or random fallback for demo
    const badgeMatch = pkg.image_prompt.match(/Badge '(\d+[\w+]*)'/);
    const badgeCount = badgeMatch ? badgeMatch[1] : '99';

    return (
        <div className="group flex flex-col bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all h-full relative">
            <Link href={`/datasets/pkg/${pkg.slug}`} className="absolute inset-0 z-0">
                <span className="sr-only">View {pkg.title}</span>
            </Link>

            {/* Cover Image Simulation */}
            <div className="h-48 bg-gradient-to-br from-slate-900 to-slate-800 relative p-6 flex flex-col justify-between pointer-events-none">
                {/* Visuals... kept pointer-events-none so click goes to Link */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold border border-white/20">
                    {pkg.category}
                </div>

                <div className="text-white">
                    <div className="text-5xl font-black opacity-20 absolute top-2 left-4">
                        {badgeCount}
                    </div>
                    <div className="relative z-10 mt-8">
                        <div className="flex gap-2 mb-2 text-white/70">
                            <FileText className="h-4 w-4" />
                        </div>
                        <h3 className="font-bold text-lg leading-tight text-white line-clamp-2 drop-shadow-sm">
                            {pkg.title}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow z-10 pointer-events-none">
                {/* Remove pointer events from container, re-enable for buttons */}

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.delivery_type === 'instant' && (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
                            <Zap className="h-3 w-3 mr-1" /> Instant
                        </Badge>
                    )}
                    {pkg.delivery_type === 'queued' && (
                        <Badge variant="outline" className="text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" /> ~24h
                        </Badge>
                    )}
                    <Badge variant="outline" className="text-muted-foreground">
                        {pkg.record_count_estimate} Records
                    </Badge>
                </div>

                <div className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        Verified {pkg.audience.role} contacts for {pkg.industry} in {pkg.geo.city || pkg.geo.country}.
                        Includes {pkg.fields_included.slice(0, 3).join(', ')}...
                    </p>
                </div>

                {/* Footer / Price */}
                <div className="pt-4 mt-auto border-t flex items-center justify-between">
                    <div>
                        {isSale && (
                            <span className="text-xs text-muted-foreground line-through block">
                                ₹{pkg.price_inr.toLocaleString()}
                            </span>
                        )}
                        <span className="font-bold text-lg text-primary">
                            ₹{pkg.sale_price_inr.toLocaleString()}
                        </span>
                    </div>
                    {/* Re-enable pointer events for the button */}
                    <Button
                        size="sm"
                        className={`gap-2 pointer-events-auto relative z-20 ${added ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        onClick={handleAddToCart}
                    >
                        {added ? 'Added' : 'Add'} <ShoppingCart className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
