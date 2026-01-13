
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight, Globe } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Business Datasets by Country | BuyDatabase.ai",
    description: "Browse business and audience datasets by country. Find structured datasets for outbound, ABM, recruitment, and market research use cases.",
};

export default function DatasetsByCountryPage() {
    const countries = [
        { name: "India", slug: "india" },
        { name: "United States", slug: "usa" },
        { name: "United Arab Emirates", slug: "uae" },
        { name: "United Kingdom", slug: "uk" },
        { name: "Canada", slug: "canada" },
        { name: "Australia", slug: "australia" },
        { name: "Singapore", slug: "singapore" },
        { name: "Germany", slug: "germany" },
        { name: "France", slug: "france" },
        { name: "Netherlands", slug: "netherlands" },
        { name: "Saudi Arabia", slug: "saudi-arabia" },
        { name: "Qatar", slug: "qatar" },
        { name: "South Africa", slug: "south-africa" },
        { name: "Nigeria", slug: "nigeria" },
        { name: "Brazil", slug: "brazil" },
        { name: "Mexico", slug: "mexico" },
        { name: "Indonesia", slug: "indonesia" },
        { name: "Philippines", slug: "philippines" },
        { name: "Japan", slug: "japan" },
        { name: "South Korea", slug: "south-korea" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Datasets', href: '/datasets' },
                { label: 'By Country', href: '/datasets/by-country' }
            ]} />

            <Hero
                heading="Browse Datasets by Country"
                subheading="Country-level datasets help teams plan market entry, regional expansion, and cross-border campaigns."
            />

            <Section>
                <div className="max-w-5xl mx-auto mb-16">
                    <h2 className="text-3xl font-heading font-bold mb-8 flex items-center">
                        <Globe className="h-8 w-8 text-primary mr-3" />
                        Available Countries
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        {countries.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/datasets/${c.slug}`} // Assuming standard slug pattern or redirection
                                className="group p-4 bg-card border rounded-lg hover:border-primary hover:shadow-sm transition-all flex items-center justify-between"
                            >
                                <span className="font-medium">{c.name} Datasets</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/datasets">
                            <Button variant="default">Browse all datasets</Button>
                        </Link>
                        <Link href="/datasets/by-role">
                            <Button variant="outline">Browse by role</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    )
}
