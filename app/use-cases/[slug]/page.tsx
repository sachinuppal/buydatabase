
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface Params {
    slug: string;
}

const USE_CASES_DATA: Record<string, { name: string; desc: string }> = {
    'outbound': { name: 'Outbound Sales', desc: 'Scale your outreach with verified emails and direct dials.' },
    'abm': { name: 'Account Based Marketing', desc: 'Target your ideal customer profile with zero waste.' },
    'recruitment': { name: 'Recruitment', desc: 'Source candidates that aren\'t applying on job boards.' },
    'market-research': { name: 'Market Research', desc: 'Get granular insights into market segments and trends.' },
    'demand-generation': { name: 'Demand Generation', desc: 'Fill your pipeline with high-intent leads.' },
};

export async function generateStaticParams() {
    return Object.keys(USE_CASES_DATA).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const data = USE_CASES_DATA[slug];
    if (!data) return {};

    return {
        title: `${data.name} with BuyDatabase.ai`,
        description: data.desc,
    };
}

export default async function UseCaseDetailPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const data = USE_CASES_DATA[slug];

    if (!data) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Use Cases', href: '/use-cases' },
                { label: data.name, href: `/use-cases/${slug}` }
            ]} />

            <Hero
                heading={data.name}
                subheading={data.desc}
            />

            <Section>
                <div className="max-w-3xl mx-auto text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Mastering {data.name}</h2>
                    <p className="text-muted-foreground mb-8">
                        Our data empowers successful {data.name.toLowerCase()} campaigns by providing the accuracy and depth you need.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg">Talk to an Expert</Button>
                        </Link>
                        <Link href="/datasets">
                            <Button variant="outline" size="lg">Browse Datasets</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    )
}
