
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CheckCircle2, ShieldCheck, Lock, Eye } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Our Data Philosophy | How BuyDatabase.ai Builds Ethical Audience Intelligence",
    description: "Learn how BuyDatabase.ai approaches data collection, validation, privacy, and ethical use to help teams build high-performing campaigns responsibly.",
};

export default function DataPhilosophyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What does BuyDatabase.ai mean by ethical data use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ethical data use at BuyDatabase.ai means focusing on relevance, aggregation, and legitimate business purposes while avoiding misuse, spam, or exposure of sensitive personal information."
                }
            },
            {
                "@type": "Question",
                "name": "Does BuyDatabase.ai sell personal data?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. BuyDatabase.ai provides aggregated audience intelligence and segmentation insights. We do not sell raw personal data or claim ownership of individual identities."
                }
            },
            {
                "@type": "Question",
                "name": "How is data sourced and validated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data is sourced from public business information, licensed partners, aggregated digital signals, and partner contributions. It is normalized, structured, and periodically reviewed."
                }
            },
            {
                "@type": "Question",
                "name": "Can datasets be used for outbound campaigns?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, datasets can be used for legitimate outbound, ABM, recruitment, and market research campaigns, provided applicable laws and best practices are followed."
                }
            },
            {
                "@type": "Question",
                "name": "How does BuyDatabase.ai prevent misuse?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We apply usage guidelines, contractual restrictions, monitoring, and customer education to discourage spam, deceptive outreach, or illegal use."
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumbs items={[
                { label: 'About', href: '#' },
                { label: 'Data Philosophy', href: '/about/data-philosophy' }
            ]} />

            <Hero
                heading="Our Data Philosophy"
                subheading="At BuyDatabase.ai, we believe data is not just an asset—it is a responsibility."
            />

            <Section>
                <div className="max-w-3xl mx-auto space-y-16">

                    {/* Why Data Philosophy Matters */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6">Why Data Philosophy Matters</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            Audience data influences how people are contacted, marketed to, hired, and engaged. Misuse of data erodes trust, damages brands, and creates long-term risk. Our philosophy is built around <strong>responsible data use</strong>, <strong>clear intent</strong>, and <strong>practical compliance</strong>.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            We do not aim to “sell lists.” We aim to help teams <strong>understand audiences</strong> and <strong>activate responsibly</strong>.
                        </p>
                    </div>

                    {/* What We Believe */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-8">What We Believe</h2>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">1. Data Should Enable Relevance, Not Spam</h3>
                                    <p className="text-muted-foreground mb-2">Campaigns work best when they are:</p>
                                    <ul className="list-disc pl-5 text-muted-foreground mb-2">
                                        <li>Targeted</li>
                                        <li>Context-aware</li>
                                        <li>Intent-aligned</li>
                                    </ul>
                                    <p className="text-muted-foreground">
                                        Irrelevant, mass outreach hurts both senders and recipients. Our datasets are structured to enable <strong>precision</strong>, not volume abuse.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">2. Aggregation {'>'} Exposure</h3>
                                    <p className="text-muted-foreground mb-2">We focus on:</p>
                                    <ul className="list-disc pl-5 text-muted-foreground mb-2">
                                        <li>Aggregated audience intelligence</li>
                                        <li>Segmentation by role, industry, geography, and intent</li>
                                        <li>Statistical and behavioral signals</li>
                                    </ul>
                                    <p className="text-muted-foreground">
                                        We avoid unnecessary exposure of sensitive or personally identifiable information (PII).
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary/10 p-2 rounded-full h-fit">
                                    <Lock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">3. Purpose-Led Data Access</h3>
                                    <p className="text-muted-foreground mb-2">Data should be used for legitimate business purposes such as:</p>
                                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 list-disc pl-5 text-muted-foreground mb-2">
                                        <li>Market research</li>
                                        <li>B2B outreach</li>
                                        <li>Recruitment</li>
                                        <li>Partnerships</li>
                                        <li>GTM planning</li>
                                        <li>Account-based marketing</li>
                                    </ul>
                                    <p className="text-muted-foreground">
                                        We actively discourage misuse, scraping abuse, or deceptive practices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How We Source & Structure Data */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6">How We Source & Structure Data</h2>
                        <div className="bg-muted/10 p-6 rounded-xl border">
                            <h3 className="font-bold mb-3">Our data ecosystem combines:</h3>
                            <ul className="list-disc pl-5 text-muted-foreground mb-4 space-y-1">
                                <li>Publicly available business information</li>
                                <li>Licensed and permissioned sources</li>
                                <li>Aggregated digital signals</li>
                                <li>User-contributed and partner-enriched insights</li>
                            </ul>
                            <h3 className="font-bold mb-3">All data is:</h3>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                <li>Structured for segmentation</li>
                                <li>Normalized for accuracy</li>
                                <li>Regularly reviewed for freshness and relevance</li>
                            </ul>
                        </div>
                    </div>

                    {/* What We Don’t Do */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6">What We Don’t Do</h2>
                        <div className="bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900 p-6 rounded-xl">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <span>We do <strong>not</strong> sell hacked, leaked, or illegally obtained data</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <span>We do <strong>not</strong> promote spam, robocalls, or deceptive outreach</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <span>We do <strong>not</strong> claim ownership of personal identities</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <span>We do <strong>not</strong> position ourselves as a “data broker for abuse”</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Continuous Improvement */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6">Continuous Improvement</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            Data quality, ethics, and regulation evolve. So do we.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            Our philosophy is reviewed continuously to align with:
                        </p>
                        <ul className="list-disc pl-5 text-muted-foreground">
                            <li>Global privacy regulations</li>
                            <li>Platform policies</li>
                            <li>Customer trust expectations</li>
                            <li>Real-world campaign outcomes</li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="bg-primary/5 rounded-2xl p-8 text-center mt-12">
                        <h3 className="text-2xl font-bold mb-4">Have questions about data sourcing or ethical use?</h3>
                        <Link href="/contact">
                            <Button size="lg" className="flex items-center gap-2 mx-auto">
                                Contact our data team <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </Section>
        </div>
    )
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
