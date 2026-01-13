
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Users, Search, CheckSquare, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: "Activation — Turn Datasets Into Revenue (and Hiring Pipelines)",
    description: "Learn how to activate BuyDatabase.ai datasets: segmentation, messaging, CRM imports, outbound sequences, and compliance-safe outreach.",
};

export default function ActivationPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Activation"
                subheading="A dataset is only valuable when it’s activated correctly. Here is how teams typically move from “download” to “results”—without spamming, wasting sends, or burning domains."
            />

            <Section>
                <div className="max-w-5xl mx-auto space-y-20">

                    {/* Activation Paths */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">Data Activation Paths</h2>
                        <div className="grid md:grid-cols-3 gap-8">

                            <div className="bg-card border rounded-2xl p-8">
                                <Target className="h-10 w-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">1. Outbound Sales</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Segment by role, seniority, and location</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Build messaging by persona</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Sequence with email + LinkedIn + calls</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Track replies and exclusions</li>
                                </ul>
                            </div>

                            <div className="bg-card border rounded-2xl p-8">
                                <Users className="h-10 w-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">2. Recruitment Sourcing</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Define role requirements and exclusions</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Build outreach tailored to candidate intent</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Track response, interviews, and pipeline</li>
                                </ul>
                            </div>

                            <div className="bg-card border rounded-2xl p-8">
                                <Search className="h-10 w-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold mb-4">3. Market Research</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Validate TAM by region/industry</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Create lists for surveys and interviews</li>
                                    <li className="flex items-start"><CheckSquare className="h-4 w-4 mr-2 mt-1" /> Build sampling frames for research</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* Checklist vs Mistakes */}
                    <div className="grid md:grid-cols-2 gap-12">

                        <div>
                            <h2 className="text-2xl font-bold mb-6">Recommended Activation Checklist</h2>
                            <ul className="space-y-4">
                                {[
                                    "Define your Ideal Audience (who you want + who you must exclude)",
                                    "Clean & normalize (remove duplicates, standardize fields)",
                                    "Enrich where necessary (company size, industry tags, etc.)",
                                    "Create segments (don’t blast one message to everyone)",
                                    "Message responsibly (relevance-first, easy opt-out)",
                                    "Measure outcomes (reply rate, conversion, pipeline impact)",
                                    "Maintain suppressions (opt-outs and do-not-contact lists)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start p-4 bg-muted/20 rounded-lg">
                                        <div className="font-bold mr-4 text-primary">{i + 1}.</div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">Avoid Common Mistakes</h2>
                            <ul className="space-y-4">
                                {[
                                    "Buying too broad a dataset “to be safe”",
                                    "Sending one generic message to every role",
                                    "Skipping suppression lists",
                                    "Treating “contacts” as “leads”",
                                    "Not aligning messaging to intent"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg">
                                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* CTA */}
                    <div className="text-center bg-primary/5 rounded-2xl p-12">
                        <h2 className="text-2xl font-bold mb-4">Want help choosing the right dataset + activation plan?</h2>
                        <Link href="/contact"><Button size="lg">Contact Us</Button></Link>
                    </div>

                </div>
            </Section>
        </div>
    )
}
