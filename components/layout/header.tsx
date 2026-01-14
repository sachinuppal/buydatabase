
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from '@/data/navigation';
import { cn } from "@/lib/utils";
import { Menu, X, Database, ChevronDown, User } from "lucide-react";
import { useState, useEffect } from "react";
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useAuth } from "@/context/auth-context";

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const { user } = useAuth();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background border-transparent"
            )}
            onMouseLeave={() => setHoveredNav(null)}
        >
            <Container>
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 z-50">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Database className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-xl tracking-tight leading-none">
                                BuyDatabase.ai
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                Audience Intelligence
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Mega Settings */}
                    <nav className="hidden md:flex items-center space-x-1 h-full">
                        {MAIN_NAV.map((item) => (
                            <div
                                key={item.label}
                                className="h-full flex items-center"
                                onMouseEnter={() => setHoveredNav(item.label)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                                        pathname?.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {item.label}
                                    {item.columns && <ChevronDown className="h-3 w-3 mt-0.5 opacity-50" />}
                                </Link>

                                {/* Mega Menu Dropdown */}
                                {item.columns && hoveredNav === item.label && (
                                    <div className="absolute top-full left-0 w-full bg-background border-b border-t shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                                        <Container className="py-8">
                                            <div className="grid grid-cols-4 gap-8">
                                                {item.columns.map((col, idx) => (
                                                    <div key={idx} className="space-y-4">
                                                        {col.title && (
                                                            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider border-b pb-2 mb-3">
                                                                {col.title}
                                                            </h4>
                                                        )}
                                                        <ul className="space-y-2">
                                                            {col.items.map((subItem) => (
                                                                <li key={subItem.href}>
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
                                                                        onClick={() => setHoveredNav(null)}
                                                                    >
                                                                        {subItem.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-6 pt-4 border-t flex justify-end">
                                                <Link href={item.href} className="text-sm font-bold text-primary hover:underline flex items-center">
                                                    View All {item.label} <span className="ml-1">→</span>
                                                </Link>
                                            </div>
                                        </Container>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center space-x-4 z-50">
                        <CartDrawer />

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/account">
                                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-2">
                                        <User className="h-4 w-4" />
                                        My Account
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="hidden sm:flex">
                                    Log in
                                </Button>
                            </Link>
                        )}

                        <LeadCaptureTrigger className="cursor-pointer font-medium text-sm text-muted-foreground hover:text-foreground hidden lg:block">
                            Contact
                        </LeadCaptureTrigger>
                        <Link href="/audiences">
                            <Button variant="premium" size="default" className="hidden md:inline-flex">Explore Audiences</Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-20 bg-background z-40 overflow-y-auto">
                        <div className="p-6 space-y-6">
                            {MAIN_NAV.map((item) => (
                                <div key={item.label} className="space-y-3">
                                    <Link
                                        href={item.href}
                                        className="text-lg font-bold text-foreground block"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                    {item.columns && (
                                        <div className="pl-4 space-y-4 border-l-2 border-muted ml-1">
                                            {item.columns.map((col, i) => (
                                                <div key={i}>
                                                    {col.title && <h5 className="text-xs font-bold text-muted-foreground uppercase mb-2">{col.title}</h5>}
                                                    <ul className="space-y-2">
                                                        {col.items.slice(0, 5).map(sub => (
                                                            <li key={sub.href}>
                                                                <Link
                                                                    href={sub.href}
                                                                    className="text-sm text-muted-foreground hover:text-primary block"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 border-t">
                                <Link href="/contact">
                                    <Button size="lg" className="w-full" variant="outline">Contact Support</Button>
                                </Link>
                            </div>
                            {/* Actions & Mobile Menu (Mobile View) */}
                            {/* ... (Mobile menu actions if needed, or kept simple) ... */}
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
}
