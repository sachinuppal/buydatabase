
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import { DATASETS } from '@/data/datasets';

export const metadata: Metadata = {
    title: "All Business & Audience Datasets | BuyDatabase.ai",
    description: "Browse all available datasets by location, role, industry, and use case. Filter, explore, and find the right dataset for your campaign or research needs.",
};

export default function AllDatasetsPage() {
    // In a real app, this would use searchParams for pagination/filtering.
    // For this implementation, we display the UI shell as requested.

    const filters = {
        Country: ["India", "USA", "UAE", "UK", "Europe", "APAC"],
        Role: ["Founders / CXOs", "Marketing", "Sales", "HR & Talent", "Technology", "Finance", "Operations"],
        Industry: ["IT & Software", "Healthcare", "Manufacturing", "Real Estate", "Financial Services", "Education"],
        UseCase: ["Outbound Prospecting", "ABM", "Recruitment", "Market Research", "Agency Campaigns"]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Datasets', href: '/datasets' },
                { label: 'All', href: '/datasets/all' }
            ]} />

            <Hero
                heading="All Datasets"
                subheading="Browse all available datasets by location, role, industry, and use case. Filter explore, and find the right dataset for your campaign."
                align="left"
            />

            <Section className="py-8">
                <div className="grid lg:grid-cols-4 gap-8">

                    {/* FILTER PANEL */}
                    <div className="hidden lg:block space-y-8 pr-4 border-r">
                        <div className="flex items-center gap-2 font-bold text-xl mb-4">
                            <Filter className="h-5 w-5" /> Filters
                        </div>
                        {Object.entries(filters).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="font-bold mb-3 text-sm uppercase text-muted-foreground tracking-wider">{category}</h3>
                                <div className="space-y-2">
                                    {items.map(item => (
                                        <div key={item} className="flex items-center space-x-2">
                                            <input type="checkbox" id={`${category}-${item}`} className="rounded border-secondary" />
                                            <label htmlFor={`${category}-${item}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {item}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DATASET LIST */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 text-sm text-muted-foreground">
                            Showing datasets 1–20 of {DATASETS.length}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {DATASETS.slice(0, 10).map((d) => (
                                <Link key={d.slug} href={`/datasets/${d.slug}`} className="group block bg-card border rounded-xl p-6 hover:shadow-md hover:border-primary transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{d.name}</h3>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{d.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="text-xs bg-muted px-2 py-1 rounded border capitalize">{d.region}</span>
                                        <span className="text-xs bg-muted px-2 py-1 rounded border capitalize">{d.type}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="flex items-center justify-center gap-2">
                            <Button variant="outline" size="icon" disabled>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="default" size="sm">1</Button>
                            <Button variant="ghost" size="sm">2</Button>
                            <Button variant="ghost" size="sm">3</Button>
                            <span className="text-muted-foreground">...</span>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t text-center">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/audiences">
                            <Button variant="outline">Explore audiences</Button>
                        </Link>
                        <Link href="/activation">
                            <Button variant="outline">Learn activation workflows</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    )
}
