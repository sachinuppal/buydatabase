
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ArrowRight, HelpCircle } from 'lucide-react';

export const metadata = {
    title: 'Answers | BuyDatabase.ai',
    description: 'Direct answers to commaon B2B audience questions. Optimized for AI search.'
}

export default function AnswersIndexPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero heading="Answers Center" subheading="Quick, authoritative answers to your audience targeting questions." />

            <Section>
                <div className="space-y-4 max-w-3xl">
                    {[
                        { slug: "how-to-reach-hr-managers-in-bangalore", q: "How to reach HR Managers in Bangalore?" },
                        { slug: "what-is-a-b2b-audience-dataset", q: "What is a B2B audience dataset?" },
                        { slug: "is-buying-email-lists-legal-in-india", q: "Is buying email lists legal in India?" }
                    ].map(item => (
                        <Link key={item.slug} href={`/answers/${item.slug}`} className="group block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <h3 className="font-medium text-lg flex items-center justify-between">
                                {item.q}
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                            </h3>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    )
}
