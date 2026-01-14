
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { DATASETS } from '@/data/datasets';

const USE_CASES = [
    { slug: 'outbound', title: 'Outbound Sales', desc: 'Fuel your cold email and calling campaigns with high-accuracy contact data.' },
    { slug: 'account-based-marketing', title: 'Account Based Marketing (ABM)', desc: 'Target key accounts with precision using rich firmographic and technographic data.' },
    { slug: 'recruitment', title: 'Recruitment & Hiring', desc: 'Find passive talent and fill open roles faster with verified candidate data.' },
    { slug: 'market-research', title: 'Market Research', desc: 'Analyze total addressable market (TAM) and industry trends.' },
] as const;

export async function generateStaticParams() {
    return USE_CASES.map(uc => ({ useCase: uc.slug }));
}

export default async function UseCasePage({ params }: { params: Promise<{ useCase: string }> }) {
    const { useCase: useCaseSlug } = await params;
    const useCase = USE_CASES.find(uc => uc.slug === useCaseSlug);
    if (!useCase) return notFound(); // Only support predefined use cases for now

    // Simple logic: Show all B2B datasets for Sales/ABM, Role for Recruitment
    const relevantDatasets = DATASETS.filter(d => {
        if (useCaseSlug === 'recruitment') return d.type === 'Role';
        if (useCaseSlug === 'outbound' || useCaseSlug === 'account-based-marketing') return d.type === 'B2B' || d.type === 'Intent';
        return true;
    }).slice(0, 10); // Show top 10

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Datasets', href: '/datasets' },
                { label: 'Use Cases', href: '/datasets/use-cases' }, // Redirect to datasets root as parent
                { label: useCase.title, href: `/datasets/use-cases/${useCase.slug}` }
            ]} />

            <Hero
                heading={`Data for ${useCase.title}`}
                subheading={useCase.desc}
            />

            <Section title="Recommended Datasets">
                <div className="grid md:grid-cols-2 gap-6">
                    {relevantDatasets.map(dataset => (
                        <Link key={dataset.slug} href={`/datasets/${dataset.slug}`} className="block p-6 bg-card border rounded-xl hover:border-primary transition-colors">
                            <h3 className="text-xl font-bold mb-2">{dataset.name}</h3>
                            <p className="text-sm text-muted-foreground">{dataset.description}</p>
                            <div className="mt-4 flex gap-2">
                                <span className="text-xs bg-muted px-2 py-1 rounded">{dataset.region}</span>
                                <span className="text-xs bg-muted px-2 py-1 rounded">{dataset.type}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    );
}
