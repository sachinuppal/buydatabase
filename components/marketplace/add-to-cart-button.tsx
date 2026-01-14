"use client";

import { useCart } from "@/context/cart-context";
import { Package } from "@/types/package";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export function AddToCartButton({ product }: { product: Package }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            className={`w-full text-base gap-2 ${added ? 'bg-green-600 hover:bg-green-700' : ''}`}
            onClick={handleAdd}
            disabled={added}
        >
            {added ? (
                <>Added <Check className="h-5 w-5" /></>
            ) : (
                <>Add to Cart <ShoppingCart className="h-5 w-5" /></>
            )}
        </Button>
    );
}
