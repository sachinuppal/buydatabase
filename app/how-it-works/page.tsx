
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { Search, Info, ShoppingCart, Zap, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: "How It Works — BuyDatabase.ai",
    description: "See how BuyDatabase.ai works: browse datasets, evaluate audience fit, purchase securely, and activate responsibly.",
};

export default function HowItWorksPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="How BuyDatabase.ai Works"
                subheading="Browse datasets, evaluate fit, purchase securely, and activate responsibly."
            />

            <Section>
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Steps */}
                    <div className="space-y-16">

                        <div className="flex md:items-start gap-6">
                            <div className="bg-primary/10 p-4 rounded-full shrink-0">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Step 1: Browse by dataset or by audience</h3>
                                <div className="text-muted-foreground mb-4">Start your discovery process broadly.</div>
                                <div className="flex gap-4">
                                    <Link href="/datasets"><Button variant="outline" size="sm">Browse all datasets</Button></Link>
                                    <Link href="/audiences"><Button variant="outline" size="sm">Browse audiences</Button></Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:items-start gap-6">
                            <div className="bg-primary/10 p-4 rounded-full shrink-0">
                                <Info className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Step 2: Evaluate fit before you buy</h3>
                                <p className="text-muted-foreground mb-2">Each dataset page explains:</p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                                    <li>Who it’s built for (ideal audiences)</li>
                                    <li>What fields are included (transparency)</li>
                                    <li>Common activation paths</li>
                                    <li>Suggested related audiences</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex md:items-start gap-6">
                            <div className="bg-primary/10 p-4 rounded-full shrink-0">
                                <ShoppingCart className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Step 3: Purchase the dataset</h3>
                                <p className="text-muted-foreground">Complete checkout securely and receive instant access to your file in the specified format (CSV/Excel).</p>
                            </div>
                        </div>

                        <div className="flex md:items-start gap-6">
                            <div className="bg-primary/10 p-4 rounded-full shrink-0">
                                <Zap className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Step 4: Activate responsibly</h3>
                                <p className="text-muted-foreground mb-4">Use our Activation framework to segment and launch outreach without burning trust.</p>
                                <Link href="/activation"><Button variant="outline" size="sm">View Activation Guide</Button></Link>
                            </div>
                        </div>

                        <div className="flex md:items-start gap-6">
                            <div className="bg-primary/10 p-4 rounded-full shrink-0">
                                <TrendingUp className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Step 5: Expand systematically</h3>
                                <p className="text-muted-foreground">Once one audience works, expand to new cities, new roles, and new industries—while keeping messaging personalized.</p>
                            </div>
                        </div>

                    </div>

                    {/* Why this works */}
                    <div className="bg-muted/20 p-8 rounded-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Why this approach works</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                            Most teams fail because they start with “a list” instead of “an audience definition.”
                            BuyDatabase.ai flips the workflow:
                        </p>
                        <div className="text-xl font-bold font-heading">
                            Audience &rarr; Dataset &rarr; Activation
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-6">Start exploring</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/datasets"><Button size="lg">Browse Datasets</Button></Link>
                            <Link href="/audiences"><Button variant="outline" size="lg">Browse Audiences</Button></Link>
                            <LeadCaptureTrigger asChild><Button variant="ghost" size="lg">Contact Sales</Button></LeadCaptureTrigger>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    )
}
