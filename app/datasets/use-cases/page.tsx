
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight, Target } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Browse Datasets by Use Case | BuyDatabase.ai",
    description: "Find the perfect B2B dataset for your specific campaign needs. Whether it's outbound, ABM, or recruitment, we have a curated list for you.",
};

const USE_CASES = [
    { label: 'Outbound Prospecting', slug: 'outbound', desc: "Data optimized for high-volume cold email and calling." },
    { label: 'Account Based Marketing', slug: 'abm', desc: "Deep intelligence on specific high-value target accounts." },
    { label: 'Demand Generation', slug: 'demand-generation', desc: "Broad audience coverage to feed your top-of-funnel." },
    { label: 'Recruitment & Hiring', slug: 'recruitment', desc: "Candidates and talent pools for specialized roles." },
    { label: 'Market Research', slug: 'market-research', desc: "Firmographic data to analyze trends and opportunities." },
];

export default function DatasetUseCasesHub() {
    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Datasets', href: '/datasets' },
                { label: 'Use Cases', href: '/datasets/use-cases' }
            ]} />

            <Hero
                heading="Find Data for Your Use Case"
                subheading="Don't just buy data; buy outcomes. Browse datasets curated for your specific campaign goals."
            />

            <Section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {USE_CASES.map((uc) => (
                        <Link
                            key={uc.slug}
                            href={`/datasets/use-cases/${uc.slug}`}
                            className="group p-6 bg-card border rounded-xl hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="p-3 bg-primary/10 w-fit rounded-lg mb-4 text-primary">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                                    {uc.label}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {uc.desc}
                                </p>
                            </div>
                            <div className="flex items-center text-sm font-semibold text-primary">
                                View Datasets <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    );
}
