
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Blog — BuyDatabase.ai",
    description: "Insights on audience building, data activation, compliance, outbound strategy, and segmentation—built for modern revenue teams.",
};

const CATEGORIES = [
    { title: "Audience Building", desc: "How to define the right segment before you buy data." },
    { title: "Outbound & ABM", desc: "Playbooks for messaging, targeting, and sequencing." },
    { title: "Recruitment & Talent", desc: "Sourcing strategies, role-based targeting, and hiring pipelines." },
    { title: "Compliance & Trust", desc: "GDPR/DPDP basics, consent, opt-outs, and responsible use." },
    { title: "Data Ops", desc: "Cleaning, deduplication, enrichment, and CRM imports." },
];

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Blog"
                subheading="Short, practical guides on how to build and activate audiences responsibly—without guesswork."
            />

            <Section>
                <div className="max-w-5xl mx-auto">

                    {/* Categories Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {CATEGORIES.map((cat, i) => (
                            <div key={i} className="p-6 bg-card border rounded-xl hover:shadow-md transition-all">
                                <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
                                <p className="text-sm text-muted-foreground">{cat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Empty State / CTA */}
                    <div className="text-center py-16 bg-muted/20 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-4">We’re publishing new posts soon.</h2>
                        <p className="text-muted-foreground mb-8">In the meantime:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/datasets"><Button variant="outline">Browse datasets</Button></Link>
                            <Link href="/audiences"><Button variant="outline">Browse audiences</Button></Link>
                            <Link href="/how-it-works"><Button variant="outline">Learn how it works</Button></Link>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    )
}
