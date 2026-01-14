import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { USE_CASES } from '@/data/use-cases';
import { ArrowLeft } from 'lucide-react';

interface Params {
    slug: string;
}

export async function generateStaticParams() {
    return USE_CASES.map((uc) => ({
        slug: uc.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const useCase = USE_CASES.find(uc => uc.slug === slug);
    if (!useCase) return {};

    return {
        title: `${useCase.title} — BuyDatabase.ai`,
        description: useCase.description,
    };
}

export default async function UseCaseDetailPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const useCase = USE_CASES.find(uc => uc.slug === slug);

    if (!useCase) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="border-b bg-muted/10">
                <div className="container mx-auto px-4 py-3">
                    <Breadcrumbs items={[
                        { label: 'Use Cases', href: '/use-cases' },
                        { label: useCase.title.split(':')[0], href: `/use-cases/${slug}` }
                    ]} />
                </div>
            </div>

            <Hero
                heading={useCase.title}
                subheading={useCase.description}
            />

            <Section>
                <div className="max-w-3xl mx-auto">
                    <Link href="/use-cases" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Use Cases
                    </Link>

                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
                        {useCase.content}
                    </article>

                    <div className="mt-16 pt-8 border-t text-center">
                        <h2 className="text-2xl font-bold mb-4">Ready to fuel your {useCase.slug === 'recruitment' ? 'hiring pipeline' : 'growth'}?</h2>
                        <p className="text-muted-foreground mb-8">
                            Get the verified data you need to execute this strategy effectively.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg">Talk to an Expert</Button>
                            </Link>
                            <Link href="/datasets">
                                <Button variant="outline" size="lg">Browse Datasets</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
