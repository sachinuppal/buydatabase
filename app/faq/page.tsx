
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: "FAQ — BuyDatabase.ai",
    description: "Answers to common questions about BuyDatabase.ai datasets: sourcing, fields, refresh, compliance, delivery formats, and support.",
};

const FAQS = [
    {
        category: "General",
        items: [
            { q: "What is BuyDatabase.ai?", a: "BuyDatabase.ai is a platform for discovering and purchasing audience datasets. Each dataset page explains who the data is for, what fields it contains, and how to activate it responsibly." },
            { q: "What can I use the datasets for?", a: "Common uses include outbound prospecting, recruitment sourcing, market research, partnerships outreach, and segmentation for campaigns." }
        ]
    },
    {
        category: "Data content",
        items: [
            { q: "What fields do datasets include?", a: "It depends on the dataset type. Each dataset page lists included fields and describes the schema at a high level (e.g., contact attributes, company attributes, location tags)." },
            { q: "Can I request additional fields?", a: "Yes. If you need extra attributes or a different schema, contact us with your requirements.", link: "/contact", linkText: "Contact Us" }
        ]
    },
    {
        category: "Freshness & updates",
        items: [
            { q: "How often is data refreshed?", a: "Some datasets are one-time snapshots, others support periodic refresh. If freshness matters, request a refresh plan.", link: "/pricing", linkText: "View Pricing" }
        ]
    },
    {
        category: "Delivery",
        items: [
            { q: "How do I receive the dataset?", a: "Typically as a downloadable file (e.g., CSV) with clear headers. For larger needs or integrations, we can provide structured exports." },
            { q: "Can you format it for my CRM?", a: "Yes—tell us your target system and required columns.", link: "/contact", linkText: "Contact Us" }
        ]
    },
    {
        category: "Compliance & trust",
        items: [
            { q: "Is BuyDatabase.ai compliant with GDPR / DPDP?", a: "We design for compliance and responsible use. See our Data Compliance page for how we approach sourcing, purpose limitation, and opt-out handling.", link: "/about/data-compliance", linkText: "Compliance Policy" },
            { q: "Do you provide opt-out support?", a: "Yes. Responsible use includes honoring opt-outs and suppression lists where applicable." }
        ]
    },
    {
        category: "Support",
        items: [
            { q: "What if I bought the wrong dataset?", a: "Contact us quickly with your order details. If the dataset hasn’t been used/downloaded/activated (based on your delivery method), we’ll try to resolve it fairly.", link: "/contact", linkText: "Contact Support" }
        ]
    }
];

export default function FAQPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Frequently Asked Questions"
                subheading="Answers to common questions about BuyDatabase.ai."
            />

            <Section>
                <div className="max-w-4xl mx-auto space-y-12">
                    {FAQS.map((section, i) => (
                        <div key={i}>
                            <h2 className="text-2xl font-bold mb-6 border-b pb-2">{section.category}</h2>
                            <div className="space-y-8">
                                {section.items.map((item, j) => (
                                    <div key={j} className="bg-card p-6 rounded-xl border">
                                        <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                        <p className="text-muted-foreground">
                                            {item.a}
                                            {item.link && (
                                                <Link href={item.link} className="ml-2 text-primary font-medium hover:underline inline-flex items-center">
                                                    → {item.linkText}
                                                </Link>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    )
}
