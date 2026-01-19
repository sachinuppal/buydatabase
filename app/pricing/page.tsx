
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Info } from 'lucide-react';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";

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

                    {/* Pricing Tiers */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">Transparent Pricing Tiers</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-4 px-6 font-bold text-lg">Dataset Size</th>
                                        <th className="py-4 px-6 font-bold text-lg">Price Per Contact</th>
                                        <th className="py-4 px-6 font-bold text-lg">Best For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bg-muted/10">
                                        <td className="py-4 px-6 font-medium">Up to 50,000 contacts</td>
                                        <td className="py-4 px-6 font-bold text-primary">₹5 / contact</td>
                                        <td className="py-4 px-6 text-muted-foreground">Startups & Niche Campaigns</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-4 px-6 font-medium">50,000 – 500,000 contacts</td>
                                        <td className="py-4 px-6 font-bold text-primary">₹4 / contact</td>
                                        <td className="py-4 px-6 text-muted-foreground">Growth Stage & Expansion</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-medium">500,000+ contacts</td>
                                        <td className="py-4 px-6 font-bold text-primary">₹3 / contact</td>
                                        <td className="py-4 px-6 text-muted-foreground">Enterprise & Large Scale</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Prices are calculated based on the total volume of the dataset.
                        </p>
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
                            <LeadCaptureTrigger asChild>
                                <Button className="w-full">Request Build</Button>
                            </LeadCaptureTrigger>
                        </div>

                        <div className="border rounded-2xl p-8 bg-card flex flex-col">
                            <h3 className="text-xl font-bold mb-2">3. Ongoing refresh</h3>
                            <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">Subscription</div>
                            <p className="text-muted-foreground flex-1 mb-6">
                                Set a refresh schedule so your dataset stays current for teams running continuous campaigns.
                            </p>
                            <LeadCaptureTrigger asChild>
                                <Button variant="outline" className="w-full">Contact Sales</Button>
                            </LeadCaptureTrigger>
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
                            <LeadCaptureTrigger asChild><Button size="lg">Contact Us</Button></LeadCaptureTrigger>
                            <Link href="/datasets"><Button variant="outline" size="lg">Browse Datasets</Button></Link>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    )
}
