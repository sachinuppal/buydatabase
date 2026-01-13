
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Target, Users, Search, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: "Use Cases | BuyDatabase.ai",
    description: "Explore how our data powers outbound sales, ABM, recruitment, and market research.",
};

const USE_CASES = [
    { slug: 'outbound', name: 'Outbound Sales', icon: Mail, desc: 'Fuel your cold email and calling campaigns.' },
    { slug: 'abm', name: 'Account Based Marketing', icon: Target, desc: 'Target key accounts with precision.' },
    { slug: 'recruitment', name: 'Recruitment', icon: Users, desc: 'Find passive talent and fill roles faster.' },
    { slug: 'market-research', name: 'Market Research', icon: Search, desc: 'Analyze markets and competitor landscapes.' },
];

export default function UseCasesIndexPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Data Use Cases"
                subheading="See how high-quality audience data can transform your business."
            />

            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {USE_CASES.map((uc) => (
                            <Link key={uc.slug} href={`/use-cases/${uc.slug}`} className="group bg-card p-8 rounded-xl border hover:shadow-md transition-all">
                                <uc.icon className="h-10 w-10 text-primary mb-6" />
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-2xl group-hover:text-primary transition-colors">{uc.name}</h3>
                                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground text-lg">{uc.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    )
}
