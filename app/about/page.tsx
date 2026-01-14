
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { ArrowRight, ShieldCheck, CheckCircle2, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: "About BuyDatabase.ai — Data You Can Trust",
    description: "Learn how BuyDatabase.ai builds compliant, verified datasets and audience pages to help teams reach the right buyers with confidence.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="About BuyDatabase.ai"
                subheading="Data You Can Trust."
            />

            <Section>
                <div className="max-w-4xl mx-auto space-y-20">

                    {/* Hero Extension */}
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            BuyDatabase.ai helps teams find and reach real buyers—using datasets that are built for trust, compliance, and results.
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We don’t just “sell lists.” We help you choose the right audience, understand what you’re buying, and activate it responsibly.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 text-left p-6 bg-muted/20 rounded-xl">
                            <Link href="/about/data-philosophy" className="flex items-center hover:text-primary transition-colors font-medium">
                                <ArrowRight className="h-4 w-4 mr-2" /> Data Philosophy
                            </Link>
                            <Link href="/about/data-compliance" className="flex items-center hover:text-primary transition-colors font-medium">
                                <ArrowRight className="h-4 w-4 mr-2" /> Data Compliance
                            </Link>
                            <Link href="/about/data-use-guidelines" className="flex items-center hover:text-primary transition-colors font-medium">
                                <ArrowRight className="h-4 w-4 mr-2" /> Data Use Guidelines
                            </Link>
                            <Link href="/privacy-policy" className="flex items-center hover:text-primary transition-colors font-medium">
                                <ArrowRight className="h-4 w-4 mr-2" /> Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* What we do */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold mb-4">We package datasets in a way that’s easy to evaluate and safe to use.</h2>
                            <p className="text-muted-foreground mb-4">Every dataset page explains:</p>
                            <ul className="space-y-3">
                                {[
                                    "Who it’s for (ideal audiences)",
                                    "What fields it contains (schema-level clarity)",
                                    "How it’s sourced and maintained (high-level transparency)",
                                    "How to activate it (workflows, not just downloads)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 bg-muted/20 p-8 rounded-2xl flex items-center justify-center">
                            <ShieldCheck className="h-24 w-24 text-primary opacity-80" />
                        </div>
                    </div>

                    {/* Who it's for */}
                    <div className="bg-card border rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-8 text-center">BuyDatabase.ai is designed for</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                "Sales teams running outbound and ABM",
                                "Recruiters sourcing candidates at scale",
                                "Marketing teams building targeted campaigns",
                                "Research teams validating markets and segments",
                                "Agencies delivering lead gen for clients"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center p-4 bg-background rounded-lg border">
                                    <Users className="h-5 w-5 text-primary mr-3" />
                                    <span className="font-medium text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our principles */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Principles</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Trust-first data</h3>
                                <p className="text-muted-foreground">We design pages and delivery flows to reduce ambiguity and prevent misuse.</p>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Clarity over hype</h3>
                                <p className="text-muted-foreground">You should know what you’re buying before you buy it.</p>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Compliance by design</h3>
                                <p className="text-muted-foreground">Policies and controls aren’t “legal pages”—they’re product features.</p>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Useful, not noisy</h3>
                                <p className="text-muted-foreground">Datasets should improve outcomes, not spam the world.</p>
                            </div>
                        </div>
                    </div>

                    {/* Where to start / CTA */}
                    <div className="bg-primary/5 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">Where to start</h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Link href="/datasets"><Button variant="outline">Browse datasets</Button></Link>
                            <Link href="/audiences"><Button variant="outline">Browse audiences</Button></Link>
                            <Link href="/how-it-works"><Button variant="outline">See how it works</Button></Link>
                        </div>
                        <div className="border-t pt-8 max-w-md mx-auto">
                            <h3 className="text-xl font-bold mb-2">Want help choosing the right dataset?</h3>
                            <p className="text-muted-foreground mb-4">Contact us and we’ll point you to the best fit.</p>
                            <LeadCaptureTrigger asChild><Button size="lg">Contact Us</Button></LeadCaptureTrigger>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    )
}
