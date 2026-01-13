
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Data Glossary | BuyDatabase.ai",
    description: "Definitions of key terms in audience intelligence and B2B data.",
};

const TERMS = [
    { term: 'ABM (Account-Based Marketing)', def: 'A strategic approach where marketing targets specific accounts as markets of one.' },
    { term: 'B2B Data', def: 'Information relating to other businesses, used for interactions and transactions between companies.' },
    { term: 'Firmographics', def: 'Descriptive attributes of firms that can be used to aggregate individual firms into meaningful market segments.' },
    { term: 'Technographics', def: 'Profiling target accounts based on their technology stack.' },
    { term: 'Intent Data', def: 'Behavioral signals that indicate a prospect is in the market to buy.' },
];

export default function GlossaryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Data Glossary"
                subheading="Master the language of audience intelligence."
            />

            <Section>
                <div className="max-w-3xl mx-auto space-y-8">
                    {TERMS.map((item, i) => (
                        <div key={i} className="border-b pb-6 last:border-0">
                            <h3 className="text-xl font-bold mb-2">{item.term}</h3>
                            <p className="text-muted-foreground">{item.def}</p>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    )
}
