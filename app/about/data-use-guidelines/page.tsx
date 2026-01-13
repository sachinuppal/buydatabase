
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { AlertCircle, Check, X } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Data Use Guidelines | Responsible Audience Activation",
    description: "Guidelines to help customers protect their brand reputation, stay compliant with regulations, and run effective, ethical campaigns using BuyDatabase.ai data.",
};

export default function DataUseGuidelinesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'About', href: '#' },
                { label: 'Data Guidelines', href: '/about/data-use-guidelines' }
            ]} />

            <Hero
                heading="Data Use Guidelines"
                subheading="Protect your brand reputation and stay compliant with our responsible activation standards."
            />

            <Section>
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Purpose */}
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Purpose of These Guidelines</h2>
                        <p className="text-muted-foreground">
                            These guidelines exist to help customers protect their brand reputation, stay compliant with regulations, and run effective, ethical campaigns.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Permitted Uses */}
                        <div className="bg-green-50 dark:bg-green-950/10 border border-green-100 dark:border-green-900 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-green-700 dark:text-green-400">
                                <Check className="h-6 w-6" /> Permitted Uses
                            </h2>
                            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-green-700/70">You may use BuyDatabase.ai data for:</p>
                            <ul className="space-y-3">
                                {[
                                    "Market research and analysis",
                                    "B2B outreach and ABM",
                                    "Recruitment and hiring",
                                    "Partnership discovery",
                                    "GTM planning"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Prohibited Uses */}
                        <div className="bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-red-700 dark:text-red-400">
                                <X className="h-6 w-6" /> Prohibited Uses
                            </h2>
                            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-red-700/70">You may NOT:</p>
                            <ul className="space-y-3">
                                {[
                                    "Send spam or robocalls",
                                    "Misrepresent identity or intent",
                                    "Attempt to re-identify individuals",
                                    "Combine data with illegal sources",
                                    "Use data for harassment or deception"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <X className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Outreach Best Practices */}
                    <div className="bg-card border p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6">Outreach Best Practices</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                "Clear identification in outreach",
                                "Relevance-based messaging",
                                "Respect for opt-outs",
                                "Reasonable frequency",
                                "Honest value propositions"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-medium text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enforcement */}
                    <div className="flex items-start gap-4 p-6 bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900 rounded-xl">
                        <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-amber-800 dark:text-amber-400">Enforcement</h3>
                            <p className="text-amber-800/80 dark:text-amber-400/80 mb-2">
                                Violation of these guidelines may result in:
                            </p>
                            <ul className="list-disc pl-5 text-amber-800/80 dark:text-amber-400/80">
                                <li>Account suspension</li>
                                <li>Access revocation</li>
                                <li>Legal action where required</li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8 border-t">
                        <h3 className="text-2xl font-bold mb-6">Need help designing compliant campaigns?</h3>
                        <Link href="/contact">
                            <Button size="lg">Talk to an expert</Button>
                        </Link>
                    </div>

                </div>
            </Section>
        </div>
    )
}
