
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ALL_ROLES } from '@/data/roles';
import { DATASETS } from '@/data/datasets';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight } from 'lucide-react';

interface Params {
    role: string;
}

export async function generateStaticParams() {
    return ALL_ROLES.map((role) => ({
        role: role.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { role: slug } = await params;
    const role = ALL_ROLES.find(r => r.slug === slug);
    if (!role) return {};

    return {
        title: `${role.name} Datasets | BuyDatabase.ai`,
        description: `Download verified lists of ${role.name}.`,
    };
}

export default async function DatasetRolePage({ params }: { params: Promise<Params> }) {
    const { role: slug } = await params;
    const role = ALL_ROLES.find(r => r.slug === slug);

    if (!role) {
        notFound();
    }

    // Simple textual matching
    const relevantDatasets = DATASETS.filter(d =>
        d.slug.includes(slug) ||
        d.description.toLowerCase().includes(role.singular.toLowerCase()) ||
        d.name.toLowerCase().includes(role.name.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Datasets', href: '/datasets' },
                { label: 'By Role', href: '/datasets/by-role' },
                { label: role.name, href: `/datasets/by-role/${slug}` }
            ]} />

            <Hero
                heading={`${role.name} Datasets`}
                subheading={`Verified data lists for ${role.name}.`}
            />

            <Section>
                <div className="max-w-5xl mx-auto mb-12">
                    {relevantDatasets.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {relevantDatasets.map((d) => (
                                <Link key={d.slug} href={`/datasets/${d.slug}`} className="block bg-card p-6 rounded-xl border hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{d.name}</h3>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{d.description}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/20 rounded-xl">
                            <p className="text-muted-foreground mb-4">No specific pre-built bundles found for this exact role, but we have them in our master database.</p>
                            <Link href="/contact"><Button>Request {role.name} Data</Button></Link>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    )
}
