"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Package } from '@/types/package';

interface CartItem extends Package {
    // addedAt: number; // Removed unused property
}

interface CartContextType {
    items: CartItem[];
    addItem: (pkg: Package) => void;
    removeItem: (pkgId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    // Initialize state properly to avoid hydration mismatch
    // We start with empty array, then populate from localStorage in useEffect
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        const stored = localStorage.getItem('cart_items');
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse cart items", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart_items', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (pkg: Package) => {
        setItems(prev => {
            // Prevent duplicates for digital products
            if (prev.find(item => item.id === pkg.id)) return prev;
            return [...prev, pkg];
        });
    };

    const removeItem = (pkgId: string) => {
        setItems(prev => prev.filter(item => item.id !== pkgId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((sum, item) => sum + item.sale_price_inr, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            clearCart,
            cartTotal,
            itemCount: items.length
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
