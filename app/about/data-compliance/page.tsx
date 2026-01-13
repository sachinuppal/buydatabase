
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Metadata } from 'next';
import { CheckCircle2, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Data Compliance & Privacy Regulations | BuyDatabase.ai",
    description: "Understand how BuyDatabase.ai aligns with GDPR, India DPDP Act, and global privacy regulations for responsible audience intelligence.",
};

export default function DataCompliancePage() {
    const bridgeSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://buydatabase.ai/about/data-compliance/#webpage",
        "name": "Data Compliance & Privacy Regulations",
        "about": {
            "@type": "TrustAction",
            "@id": "https://buydatabase.ai/#trust-action"
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeSchema) }}
            />
            <Breadcrumbs items={[
                { label: 'About', href: '#' },
                { label: 'Compliance', href: '/about/data-compliance' }
            ]} />

            <Hero
                heading="Data Compliance & Privacy Regulations"
                subheading="BuyDatabase.ai is built to operate responsibly across jurisdictions."
            />

            <Section>
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Our Compliance Approach */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6">Our Compliance Approach</h2>
                        <p className="text-lg text-muted-foreground">
                            BuyDatabase.ai is built to operate responsibly across jurisdictions. We design systems, processes, and customer guidelines to align with modern privacy regulations while enabling legitimate business use.
                        </p>
                    </div>

                    {/* GDPR */}
                    <div className="bg-card border p-8 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="h-8 w-8 text-primary" />
                            <h2 className="text-2xl font-bold m-0">GDPR (EU)</h2>
                        </div>
                        <p className="mb-4">Under the General Data Protection Regulation (GDPR), BuyDatabase.ai:</p>
                        <ul className="space-y-3">
                            {[
                                "Processes data under legitimate interest and contractual necessity",
                                "Applies data minimization and purpose limitation",
                                "Supports access, correction, and deletion requests",
                                "Avoids unnecessary exposure of personal identifiers",
                                "Maintains vendor and processor agreements"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* India DPDP */}
                    <div className="bg-card border p-8 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="h-8 w-8 text-orange-600" />
                            <h2 className="text-2xl font-bold m-0">India DPDP Act</h2>
                        </div>
                        <p className="mb-4 font-medium text-muted-foreground">Digital Personal Data Protection Act</p>
                        <p className="mb-4">In line with India’s DPDP Act, we:</p>
                        <ul className="space-y-3">
                            {[
                                "Limit data use to clear, defined purposes",
                                "Encourage lawful and transparent outreach",
                                "Apply safeguards against misuse",
                                "Respect user rights where applicable",
                                "Maintain reasonable security practices"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Other Frameworks */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-6">Other Frameworks Considered</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "CCPA / CPRA (California)",
                                "PECR (UK)",
                                "CAN-SPAM (US email practices)",
                                "Industry best practices for B2B outreach"
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-muted/20 border rounded-lg font-medium">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What Compliance Means for Customers */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6">What Compliance Means for Customers</h2>
                        <p className="text-lg mb-8">Compliance is a <strong>shared responsibility</strong>.</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="border-l-4 border-primary pl-6 py-2">
                                <h3 className="font-bold text-xl mb-4">BuyDatabase.ai provides:</h3>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li>Structured, responsible datasets</li>
                                    <li>Clear usage guidelines</li>
                                    <li>Support documentation</li>
                                </ul>
                            </div>
                            <div className="border-l-4 border-cyan-500 pl-6 py-2">
                                <h3 className="font-bold text-xl mb-4">Customers are responsible for:</h3>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    <li>Lawful outreach practices</li>
                                    <li>Consent management where required</li>
                                    <li>Honoring opt-outs and requests</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-muted p-8 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold mb-2">Questions about compliance?</h3>
                        <p className="mb-6 text-muted-foreground">Our team is here to clarify any regulatory concerns.</p>
                        <a href="mailto:compliance@buydatabase.ai" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2">
                            Email compliance@buydatabase.ai
                        </a>
                    </div>

                </div>
            </Section>
        </div>
    )
}
