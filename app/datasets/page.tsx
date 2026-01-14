"use client";

import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { MarketplaceClient } from '@/components/marketplace/marketplace-client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Package } from '@/types/package';
import { Loader2 } from 'lucide-react';

// Default mock values for fields not yet in DB
const DEFAULT_FIELDS = ["Company Name", "Website", "LinkedIn URL", "Decision Maker Name", "Designation", "Email Address (Verified)", "Phone (Direct/HQ)", "Employee Count", "Revenue Range"];

export default function DatasetsIndexPage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                // Map DB Products to Frontend Package Type
                const mappedPackages: Package[] = data.map(p => ({
                    id: p.id,
                    slug: p.slug,
                    title: p.title,
                    category: p.industry || "General", // Default category
                    geo: {
                        country: p.region || "India",
                        city: p.city
                    },
                    audience: {
                        group: p.seniority || "All Levels",
                        role: p.role || "Professionals"
                    },
                    industry: p.industry || "General",
                    record_count_estimate: p.records_count || "Unknown",
                    fields_included: DEFAULT_FIELDS,
                    update_frequency: "Monthly", // Default
                    formats: p.format?.split('/') || ["CSV", "XLSX"],
                    price_inr: p.price_inr,
                    sale_price_inr: p.sale_price_inr,
                    delivery_type: p.delivery_type as any,
                    image_prompt: "" // Image generation handled by card component or ignored
                }));
                setPackages(mappedPackages);
            }
        } catch (error) {
            console.error("Failed to fetch packages", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO */}
            <section className="relative py-16 bg-background border-b overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-50"></div>
                <div className="max-w-5xl mx-auto px-6 text-center relative">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Dataset Marketplace</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Instant access to verified business data. Browse our catalog of role-based, industry-specific, and intent-driven audience packages.
                    </p>
                </div>
            </section>

            {/* 2. MARKETPLACE APP */}
            <Section className="py-12 bg-muted/5 min-h-[800px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Loading catalog...</p>
                    </div>
                ) : (
                    <MarketplaceClient packages={packages} />
                )}
            </Section>
        </div>
    );
}
