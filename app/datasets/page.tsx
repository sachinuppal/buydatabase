
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Globe, Briefcase, Factory, Search, CheckSquare } from 'lucide-react';
import { Metadata } from 'next';
import { DATASETS } from '@/data/datasets';

export const metadata: Metadata = {
    title: "Dataset Library: Business & Audience Datasets | BuyDatabase.ai",
    description: "Browse datasets by location, role, industry, and use case. Find structured audience datasets designed for outbound, ABM, and market research.",
};

export default function DatasetsIndexPage() {
    const featuredSlugs = [
        'india-b2b-professionals',
        'india-senior-decision-makers',
        'india-hr-and-talent-leaders',
        'india-marketing-and-demand-generation-leaders-india', // Adjusted to match slug format
        'india-founders-and-cofounders', // Replacing IT Companies for now if not in dictionary
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO & INTRO */}
            <section className="relative py-20 bg-background border-b overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-50"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">Dataset Library</h1>
                    <h2 className="text-xl md:text-2xl font-medium text-primary mb-8">
                        Find the right dataset for targeting, research, and activation
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        BuyDatabase.ai offers a growing library of <strong>structured business audience datasets</strong> organized for real-world use cases like Outbound, ABM, Market Research, and Recruitment.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/datasets">
                            <Button size="lg" variant="default">Browse All Datasets</Button>
                        </Link>
                        <Link href="/datasets/by-country">
                            <Button size="lg" variant="outline">Browse by Country</Button>
                        </Link>
                        <Link href="/datasets/by-role">
                            <Button size="lg" variant="outline">Browse by Role</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. FEATURED DATASETS */}
            <Section className="bg-muted/30">
                <h2 className="text-3xl font-heading font-bold mb-2">Featured Datasets</h2>
                <p className="text-muted-foreground mb-8">High-demand starting points for your campaigns.</p>

                <div className="grid md:grid-cols-2 gap-6">
                    {featuredSlugs.map((slug) => {
                        const dataset = DATASETS.find(d => d.slug === slug);
                        if (!dataset) return null;
                        return (
                            <Link key={slug} href={`/datasets/${slug}`} className="group p-6 bg-background rounded-xl border hover:border-primary transition-all shadow-sm hover:shadow-md">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Database className="h-6 w-6 text-primary" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{dataset.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{dataset.description}</p>
                            </Link>
                        )
                    })}
                </div>
                <div className="mt-8">
                    <Link href="/datasets" className="text-primary font-medium hover:underline inline-flex items-center">
                        View featured collection <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </Section>

            {/* 3. BROWSE BY SECTIONS (Grid Layout) */}
            <Section>
                <div className="grid md:grid-cols-3 gap-12">

                    {/* By Location */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-bold font-heading">By Location</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { label: "India Datasets", href: "/datasets" }, // Linking to main for now as filter not built
                                { label: "UAE Datasets", href: "/datasets" },
                                { label: "USA Datasets", href: "/datasets" },
                                { label: "Europe Datasets", href: "/datasets" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary hover:underline">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* By Role */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-bold font-heading">By Role / Persona</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { label: "Founders & CXOs", href: "/datasets" },
                                { label: "HR & Talent", href: "/datasets" },
                                { label: "Marketing Leads", href: "/datasets" },
                                { label: "Sales Leads", href: "/datasets" },
                                { label: "Finance Leads", href: "/datasets" },
                                { label: "Technology / IT", href: "/datasets" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary hover:underline">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* By Industry */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Factory className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-bold font-heading">By Industry</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { label: "IT & Software", href: "/datasets" },
                                { label: "Healthcare", href: "/datasets" },
                                { label: "Manufacturing", href: "/datasets" },
                                { label: "Real Estate", href: "/datasets" },
                                { label: "Education", href: "/datasets" },
                                { label: "Financial Services", href: "/datasets" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary hover:underline">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* 4. USE CASES */}
            <Section className="bg-secondary/20">
                <h2 className="text-3xl font-heading font-bold mb-8 text-center">Choose a Dataset by Use Case</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Outbound Prospecting", subtitle: "Role + City", href: "/activation" },
                        { title: "ABM Campaigns", subtitle: "Decision-Makers + Company", href: "/activation" },
                        { title: "Recruitment", subtitle: "Role + Location Workforce", href: "/activation" },
                        { title: "Market Research", subtitle: "Geo + Industry + Size", href: "/activation" }
                    ].map((item, i) => (
                        <Link key={i} href={item.href} className="bg-background p-6 rounded-xl border hover:shadow-md transition-all text-center">
                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{item.subtitle}</p>
                            <span className="text-primary text-sm font-medium">View Datasets →</span>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* 5. WHAT'S INCLUDED */}
            <Section>
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-heading font-bold mb-6">What You’ll Find on Every Dataset Page</h2>
                        <ul className="space-y-4">
                            {[
                                "Clear definition of the audience",
                                "Targeting and segmentation guidance",
                                "Ideal buyers and teams who use it",
                                "Internal links to related audiences",
                                "FAQs for AEO (LLM-friendly)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-lg">
                                    <CheckSquare className="h-5 w-5 text-primary mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            {/* Link to a real dataset as sample */}
                            <Link href="/datasets/india-b2b-professionals">
                                <Button variant="outline">See a sample dataset page</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 p-8 bg-muted/50 rounded-2xl border">
                        {/* Visual placeholder for dataset preview */}
                        <div className="space-y-3">
                            <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
                            <div className="h-4 w-1/2 bg-muted-foreground/20 rounded" />
                            <div className="h-32 w-full bg-background rounded border shadow-sm" />
                        </div>
                    </div>
                </div>
            </Section>

            {/* 6. FAQ */}
            <Section className="bg-muted/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "What is a “dataset” on BuyDatabase.ai?", a: "A dataset is a structured audience segment organized for targeting and planning—typically grouped by location, role, or industry." },
                            { q: "Should I choose a dataset or an audience combo page first?", a: "If you already know your segment (e.g., “HR Managers in Bangalore”), start with audience combo pages. If you’re exploring options, start with the dataset library." },
                            { q: "Are dataset pages meant for SEO only?", a: "No—dataset pages are built to be useful landing pages for teams evaluating who to target, how to message, and what segment to prioritize." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-background p-6 rounded-xl border">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* FINAL CTA */}
            <Section className="text-center pt-0 pb-20">
                <h2 className="text-3xl font-heading font-bold mb-8">Browse the dataset library and find your best segment</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/datasets"><Button variant="default" size="lg">Browse all datasets</Button></Link>
                    <Link href="/audiences"><Button variant="outline" size="lg">Explore audiences</Button></Link>
                    <Link href="/activation"><Button variant="outline" size="lg">Learn activation workflows</Button></Link>
                </div>
            </Section>
        </div>
    );
}
