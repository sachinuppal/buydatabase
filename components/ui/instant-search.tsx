"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Database, MapPin, Briefcase, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Static data imports for client-side search
import { ALL_CITIES } from "@/data/locations";
import { ALL_ROLES } from "@/data/roles";

interface CityData {
    slug: string;
    name: string;
    country: string;
}

interface RoleData {
    slug: string;
    name: string;
    singular: string;
}

interface SearchResult {

    id: string;
    title: string;
    description?: string;
    type: 'dataset' | 'city' | 'role' | 'industry';
    href: string;
    price?: number;
    badge?: string;
}

interface InstantSearchProps {
    placeholder?: string;
    className?: string;
    variant?: 'hero' | 'header' | 'default';
}

// Popular/suggested searches
const SUGGESTED_SEARCHES = [
    { label: "Founders in Bangalore", query: "founders bangalore", type: "dataset" },
    { label: "HR Managers", query: "HR Managers", type: "role" },
    { label: "Mumbai", query: "Mumbai", type: "city" },
    { label: "CXO Database", query: "CXO", type: "dataset" },
    { label: "IT Companies", query: "IT Software", type: "dataset" },
    { label: "Delhi NCR", query: "Delhi", type: "city" },
];

export function InstantSearch({
    placeholder = "Search datasets, cities, roles...",
    className = "",
    variant = 'default'
}: InstantSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Search logic
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const searchTimeout = setTimeout(async () => {
            setLoading(true);
            const searchResults: SearchResult[] = [];
            const q = query.toLowerCase();

            // 1. Search Datasets from Supabase
            try {
                const { data: products } = await supabase
                    .from('products')
                    .select('id, title, slug, sale_price_inr, industry, region')
                    .or(`title.ilike.%${query}%,industry.ilike.%${query}%,region.ilike.%${query}%`)
                    .limit(5);

                products?.forEach(p => {
                    searchResults.push({
                        id: `product-${p.id}`,
                        title: p.title,
                        description: `${p.region} • ${p.industry}`,
                        type: 'dataset',
                        href: `/datasets/pkg/${p.slug}`,
                        price: p.sale_price_inr,
                        badge: `₹${p.sale_price_inr?.toLocaleString()}`
                    });
                });
            } catch (e) {
                console.error('Product search error:', e);
            }

            // 2. Search Cities (client-side)
            const matchingCities = (ALL_CITIES as readonly CityData[]).filter((city: CityData) =>
                city.name.toLowerCase().includes(q) ||
                city.country.toLowerCase().includes(q)
            ).slice(0, 3);

            matchingCities.forEach((city: CityData) => {
                searchResults.push({
                    id: `city-${city.slug}`,
                    title: city.name,
                    description: city.country,
                    type: 'city',
                    href: `/audiences/${city.country.toLowerCase().replace(/\s+/g, '-')}/${city.slug}`,
                    badge: 'City'
                });
            });

            // 3. Search Roles (client-side)
            const matchingRoles = (ALL_ROLES as readonly RoleData[]).filter((role: RoleData) =>
                role.name.toLowerCase().includes(q) ||
                role.singular.toLowerCase().includes(q)
            ).slice(0, 3);

            matchingRoles.forEach((role: RoleData) => {
                searchResults.push({
                    id: `role-${role.slug}`,
                    title: role.name,
                    description: role.singular,
                    type: 'role',
                    href: `/audiences/india/mumbai/${role.slug}`,
                    badge: 'Role'
                });
            });

            setResults(searchResults);
            setLoading(false);
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [query]);

    const handleSelect = (result: SearchResult) => {
        setOpen(false);
        setQuery("");
        router.push(result.href);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && results.length > 0) {
            handleSelect(results[0]);
        }
        if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const getIcon = (type: SearchResult['type']) => {
        switch (type) {
            case 'dataset': return <Database className="h-4 w-4 text-blue-500" />;
            case 'city': return <MapPin className="h-4 w-4 text-green-500" />;
            case 'role': return <Briefcase className="h-4 w-4 text-purple-500" />;
            case 'industry': return <TrendingUp className="h-4 w-4 text-orange-500" />;
        }
    };

    const sizeClasses = variant === 'hero'
        ? 'h-14 text-lg pl-12 pr-4'
        : variant === 'header'
            ? 'h-10 text-sm pl-10 pr-4'
            : 'h-12 text-base pl-11 pr-4';

    const iconClasses = variant === 'hero'
        ? 'left-4 h-5 w-5'
        : 'left-3 h-4 w-4';

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <div className="relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${iconClasses}`} />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                        setShowSuggestions(false);
                    }}
                    onFocus={() => {
                        if (query.length >= 2) {
                            setOpen(true);
                        } else {
                            setShowSuggestions(true);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    className={`${sizeClasses} rounded-xl border-2 focus:border-primary bg-background shadow-sm`}
                />
                {loading && (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
            </div>

            {/* Suggested Searches - Show when focused but no query */}
            {showSuggestions && query.length < 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-3 border-b bg-muted/30">
                        <p className="text-xs font-medium text-muted-foreground">Popular Searches</p>
                    </div>
                    <div className="p-2 flex flex-wrap gap-2">
                        {SUGGESTED_SEARCHES.map((suggestion) => (
                            <button
                                key={suggestion.query}
                                onClick={() => {
                                    setQuery(suggestion.query);
                                    setShowSuggestions(false);
                                    setOpen(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                            >
                                {suggestion.label}
                            </button>
                        ))}
                    </div>
                    <div className="p-3 bg-muted/30 border-t">
                        <div className="flex gap-3 text-xs">
                            <Link href="/datasets" className="text-primary hover:underline" onClick={() => setShowSuggestions(false)}>
                                Browse All Datasets →
                            </Link>
                            <Link href="/audiences" className="text-primary hover:underline" onClick={() => setShowSuggestions(false)}>
                                Explore Audiences →
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Results Dropdown */}
            {open && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-lg z-50 overflow-hidden">
                    {loading && results.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            Searching...
                        </div>
                    ) : results.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            No results found for "{query}"
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
                                {SUGGESTED_SEARCHES.slice(0, 3).map((s) => (
                                    <button
                                        key={s.query}
                                        onClick={() => setQuery(s.query)}
                                        className="px-2 py-1 text-xs bg-muted hover:bg-primary/10 rounded-full"
                                    >
                                        Try: {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-h-[400px] overflow-y-auto divide-y">
                            {results.map((result) => (
                                <button
                                    key={result.id}
                                    onClick={() => handleSelect(result)}
                                    className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                                >
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                        {getIcon(result.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{result.title}</p>
                                        {result.description && (
                                            <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                                        )}
                                    </div>
                                    {result.badge && (
                                        <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${result.type === 'dataset'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {result.badge}
                                        </span>
                                    )}
                                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Quick Links */}
                    {results.length > 0 && (
                        <div className="p-3 bg-muted/30 border-t">
                            <div className="flex gap-2 flex-wrap">
                                <Link href="/datasets" className="text-xs text-primary hover:underline">
                                    Browse All Datasets →
                                </Link>
                                <Link href="/audiences" className="text-xs text-primary hover:underline">
                                    Explore Audiences →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
