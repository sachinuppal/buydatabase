"use client";

import { Package } from "@/types/package";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Check, FileSpreadsheet } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DatasetRowProps {
    pkg: Package;
}

export function DatasetRow({ pkg }: DatasetRowProps) {
    const { addItem, items } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const isAdded = items.some(item => item.id === pkg.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(pkg);
    };

    return (
        <div
            className="group flex items-center gap-4 p-3 border-b hover:shadow-md transition-all cursor-pointer bg-background"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. Drag/Select Handle (Visual) */}
            <div className="flex items-center gap-2 text-muted-foreground/30 pl-1">
                <div className="h-4 w-4 border rounded-sm" />
                <Star className="h-4 w-4 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>

            {/* 2. Content */}
            <Link href={`/datasets`} className="flex-1 flex items-center min-w-0 gap-4 text-sm text-foreground no-underline">
                <div className="flex-1 min-w-0 flex items-baseline gap-2">
                    <span className="font-bold truncate text-base">{pkg.title}</span>
                    <span className="text-muted-foreground truncate hidden sm:inline-block">
                        - {pkg.record_count_estimate} Records • {pkg.industry}
                    </span>
                </div>

                {/* Badges/Tags (Gmail labels style) */}
                <div className="hidden md:flex gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-sm bg-muted text-xs font-medium text-muted-foreground border">
                        {pkg.geo.country}
                    </span>
                    {pkg.delivery_type === 'instant' && (
                        <span className="px-2 py-0.5 rounded-sm bg-green-50 text-xs font-medium text-green-700 border border-green-200">
                            Instant
                        </span>
                    )}
                </div>
            </Link>

            {/* 3. Actions / Price */}
            <div className="shrink-0 flex items-center justify-end w-[140px] gap-2">
                {/* Show Price normally, Show Button on Hover or if added */}
                <div className={cn(
                    "flex items-center justify-end transition-all duration-200 gap-3",
                    (isHovered || isAdded) ? "opacity-100" : "opacity-100" // Always show for now, but style shifts
                )}>
                    {(!isHovered && !isAdded) && (
                        <span className="font-mono font-medium text-sm">₹{pkg.sale_price_inr.toLocaleString()}</span>
                    )}

                    {(isHovered || isAdded) && (
                        <Button
                            size="sm"
                            variant={isAdded ? "outline" : "default"}
                            className={cn(
                                "h-8 px-3 transition-all",
                                isAdded ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" : ""
                            )}
                            onClick={handleAddToCart}
                            disabled={isAdded}
                        >
                            {isAdded ? (
                                <>
                                    <Check className="h-3.5 w-3.5 mr-1.5" /> Added
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                                    <span className="font-bold">₹{pkg.sale_price_inr.toLocaleString()}</span>
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
