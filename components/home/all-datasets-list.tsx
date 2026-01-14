"use client";

import { DatasetRow } from "./dataset-row";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Package } from "@/types/package";


export function AllDatasetsList() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [packages, setPackages] = useState<Package[]>([]); // Initialize empty
    const [loading, setLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        // Fallback to static if DB fails or is empty initially (optional strategy, but for now we fetch only)
        // Actually, let's keep it simple: Fetch DB.
        const fetchDB = async () => {
            try {
                const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
                if (data && data.length > 0) {
                    const mapped: Package[] = data.map(p => ({
                        id: p.id,
                        slug: p.slug,
                        title: p.title,
                        category: p.industry || "General",
                        geo: { country: p.region || "India", city: p.city },
                        audience: { group: p.seniority || "All", role: p.role || "Pro" },
                        industry: p.industry || "General",
                        record_count_estimate: p.records_count || "?",
                        fields_included: [],
                        update_frequency: "Monthly",
                        formats: ["CSV"],
                        price_inr: p.price_inr,
                        sale_price_inr: p.sale_price_inr,
                        delivery_type: p.delivery_type as any,
                        image_prompt: ""
                    }));
                    setPackages(mapped);
                } else {
                    // Fallback to static if DB empty? 
                    // No, "Buy Data" should show what's available. 
                    // If empty, show empty.
                    setPackages([]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchDB();
    }, []);

    // Sort packages: Instant delivery first, then price high to low
    const sortedPackages = [...packages].sort((a, b) => {
        if (a.delivery_type === 'instant' && b.delivery_type !== 'instant') return -1;
        if (a.delivery_type !== 'instant' && b.delivery_type === 'instant') return 1;
        return b.sale_price_inr - a.sale_price_inr;
    });

    const displayedPackages = isExpanded ? sortedPackages : sortedPackages.slice(0, 10);

    if (loading) return <div className="p-8 text-center text-sm text-muted-foreground">Loading datasets...</div>;

    return (
        <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
            <div className="p-3 border-b bg-muted/40 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <div className="w-8 flex justify-center">#</div>
                <div className="flex-1">Package Name</div>
                <div className="w-[140px] text-right pr-4">Price</div>
            </div>

            <div className="divide-y">
                {displayedPackages.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No datasets available.</div>
                ) : (
                    displayedPackages.map((pkg) => (
                        <DatasetRow key={pkg.id} pkg={pkg} />
                    ))
                )}
            </div>

            {/* Expand/Collapse Footer */}
            {sortedPackages.length > 10 && (
                <div className="p-2 bg-muted/20 border-t text-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-muted-foreground hover:text-primary w-full h-9"
                    >
                        {isExpanded ? (
                            <>Show Less <ChevronUp className="ml-2 h-4 w-4" /></>
                        ) : (
                            <>View All {sortedPackages.length} Datasets <ChevronDown className="ml-2 h-4 w-4" /></>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
