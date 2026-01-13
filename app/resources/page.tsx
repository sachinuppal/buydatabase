
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FileText, HelpCircle, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
    title: "Resources | BuyDatabase.ai",
    description: "Playbooks, guides, and tools for data-driven growth.",
};

const RESOURCES = [
    { name: 'Playbooks', href: '/playbooks', icon: BookOpen, desc: 'Step-by-step guides for campaign execution.' },
    { name: 'Blog', href: '/blog', icon: FileText, desc: 'News and deep dives.' },
    { name: 'FAQs', href: '/faq', icon: HelpCircle, desc: 'Common questions answered.' },
    { name: 'Activation', href: '/activation', icon: Lightbulb, desc: 'How to use your data.' },
];

export default function ResourcesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Resources"
                subheading="Everything you need to succeed with data."
            />

            <Section>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {RESOURCES.map((res) => (
                        <Link key={res.name} href={res.href} className="group bg-card p-8 rounded-xl border hover:shadow-md transition-all text-center flex flex-col items-center">
                            <res.icon className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{res.name}</h3>
                            <p className="text-muted-foreground">{res.desc}</p>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    )
}
