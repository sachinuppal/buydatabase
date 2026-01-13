
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Building2 } from 'lucide-react';
import { INDUSTRIES } from '@/data/industries';

export const metadata: Metadata = {
    title: "Audiences by Industry | BuyDatabase.ai",
    description: "Browse B2B audience lists segmented by industry vertical.",
};

export default function IndustryIndexPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Audiences by Industry"
                subheading="Find decision makers in specific verticals. From Healthcare to SaaS."
            />

            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {INDUSTRIES.map((ind) => (
                            <Link key={ind.slug} href={`/audiences/by-industry/${ind.slug}`} className="group bg-card p-6 rounded-xl border hover:shadow-md transition-all">
                                <Building2 className="h-8 w-8 text-primary mb-4" />
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{ind.name}</h3>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">Browse {ind.name} audiences.</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    )
}
