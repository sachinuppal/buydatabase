
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Info } from 'lucide-react';

export const metadata: Metadata = {
    title: "Pricing — BuyDatabase.ai",
    description: "Understand how BuyDatabase.ai pricing works: dataset access, custom builds, refresh options, and activation support.",
};

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Pricing"
                subheading="Pricing depends on the dataset scope (location, role, industry), depth (fields), and freshness (refresh frequency). We keep pricing simple and transparent once we understand what you need."
            />

            <Section>
                <div className="max-w-5xl mx-auto space-y-20">

                    {/* How pricing works */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">How pricing is calculated</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                { title: "Audience Scope", desc: "Single city vs multi-city vs national/global" },
                                { title: "Role Specificity", desc: "Broad function vs niche seniority" },
                                { title: "Fields Included", desc: "Phone/email/company attributes, etc." },
                                { title: "Verification", desc: "One-time pull vs ongoing refresh" },
                                { title: "Delivery Format", desc: "Raw CSV vs normalized schema vs API-ready" },
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-muted/20 rounded-xl border text-center">
                                    <div className="font-bold text-lg mb-2">{i + 1}</div>
                                    <div className="font-bold mb-1 leading-tight">{item.title}</div>
                                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Purchase Paths */}
                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="border rounded-2xl p-8 bg-card flex flex-col">
                            <h3 className="text-xl font-bold mb-2">1. Ready-made datasets</h3>
                            <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">Fastest</div>
                            <p className="text-muted-foreground flex-1 mb-6">
                                Choose an existing dataset from our library and purchase instantly. Best for standard segments.
                            </p>
                            <Link href="/datasets">
                                <Button variant="outline" className="w-full">Browse Library</Button>
                            </Link>
                        </div>

                        <div className="border border-primary rounded-2xl p-8 bg-card flex flex-col relative shadow-lg">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase">
                                Best Fit
                            </div>
                            <h3 className="text-xl font-bold mb-2">2. Custom datasets</h3>
                            <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">Tailored</div>
                            <p className="text-muted-foreground flex-1 mb-6">
                                Request a tailored build if you need a unique combination, exclusion rules, or a specific schema.
                            </p>
                            <Link href="/contact">
                                <Button className="w-full">Request Build</Button>
                            </Link>
                        </div>

                        <div className="border rounded-2xl p-8 bg-card flex flex-col">
                            <h3 className="text-xl font-bold mb-2">3. Ongoing refresh</h3>
                            <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">Subscription</div>
                            <p className="text-muted-foreground flex-1 mb-6">
                                Set a refresh schedule so your dataset stays current for teams running continuous campaigns.
                            </p>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full">Contact Sales</Button>
                            </Link>
                        </div>
                    </div>

                    {/* What you get */}
                    <div className="bg-muted/10 rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-8 text-center">Every purchase includes</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-background p-3 rounded-full mb-4 border"><Info className="h-6 w-6 text-primary" /></div>
                                <h3 className="font-bold mb-2">Defined Schema Overview</h3>
                                <p className="text-sm text-muted-foreground">Detailed breakdown of exactly what fields are included.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-background p-3 rounded-full mb-4 border"><Check className="h-6 w-6 text-primary" /></div>
                                <h3 className="font-bold mb-2">Audience Definition Clarity</h3>
                                <p className="text-sm text-muted-foreground">Crystal clear understanding of who is and isn’t included.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-background p-3 rounded-full mb-4 border"><Check className="h-6 w-6 text-primary" /></div>
                                <h3 className="font-bold mb-2">Basic Activation Guidance</h3>
                                <p className="text-sm text-muted-foreground">Instructions on how to use the data responsibly.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-6">Get a quote or recommendation</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact"><Button size="lg">Contact Us</Button></Link>
                            <Link href="/datasets"><Button variant="outline" size="lg">Browse Datasets</Button></Link>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    )
}
