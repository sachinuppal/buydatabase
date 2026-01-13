
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { INDUSTRIES } from '@/data/industries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface Params {
    industry: string;
}

export async function generateStaticParams() {
    return INDUSTRIES.map((ind) => ({
        industry: ind.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { industry: slug } = await params;
    const data = INDUSTRIES.find(i => i.slug === slug);
    if (!data) return {};

    return {
        title: `${data.name} Audience Lists | BuyDatabase.ai`,
        description: `Verified B2B contacts and decision makers in the ${data.name} industry.`,
    };
}

export default async function IndustryDetailPage({ params }: { params: Promise<Params> }) {
    const { industry: slug } = await params;
    const data = INDUSTRIES.find(i => i.slug === slug);

    if (!data) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Industry', href: '/audiences/by-industry' },
                { label: data.name, href: `/audiences/by-industry/${slug}` }
            ]} />

            <Hero
                heading={`${data.name} Audiences`}
                subheading={`Reach key decision makers in the ${data.name} sector.`}
            />

            <Section>
                <div className="max-w-3xl mx-auto text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Dedicated Lists for {data.name}</h2>
                    <p className="text-muted-foreground mb-8">
                        We provide comprehensive data for the {data.name} sector, including contact info for key roles and decision makers.
                    </p>
                    <p className="text-sm text-muted-foreground italic mb-12">
                        (Specific segment lists for this industry are being indexed. Contact sales for custom pulls.)
                    </p>
                    <Link href="/contact">
                        <Button size="lg">Request {data.name} Data</Button>
                    </Link>
                </div>
            </Section>
        </div>
    )
}
