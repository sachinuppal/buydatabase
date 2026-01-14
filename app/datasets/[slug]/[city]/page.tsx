import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { ALL_CITIES, COUNTRIES } from '@/data/locations';
import { DATASETS } from '@/data/datasets';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CTA } from '@/components/ui/cta';
import { Metadata } from 'next';

// 1. Generate Static Params for known Country/City combos
export async function generateStaticParams() {
    const paths = [];
    for (const country of COUNTRIES) {
        const countryCities = ALL_CITIES.filter(c => c.country === country.name);
        for (const city of countryCities) {
            paths.push({
                slug: country.slug, // e.g. 'india', 'usa'
                city: city.slug     // e.g. 'bangalore', 'new-york'
            });
        }
    }
    return paths;
}

// 2. Metadata Generator
export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
    const { slug, city } = await params;

    // Validate Country & City
    const countryData = COUNTRIES.find(c => c.slug === slug);
    const cityData = ALL_CITIES.find(c => c.slug === city && c.country === countryData?.name);

    if (!countryData || !cityData) return {};

    return {
        title: `${cityData.name} B2B Data - Email & Phone Lists`,
        description: `Verified B2B datasets for ${cityData.name}, ${countryData.name}. Connect with decision makers, founders, and key professionals in ${cityData.name}.`,
    };
}

// 3. Page Component
export default async function CityDatasetPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
    const { slug, city } = await params;

    // Validate
    const countryData = COUNTRIES.find(c => c.slug === slug);
    const cityData = ALL_CITIES.find(c => c.slug === city && c.country === countryData?.name);

    if (!countryData || !cityData) {
        notFound();
    }

    // Get Datasets relevant to this Country
    const countryDatasets = DATASETS.filter(d =>
        d.region === countryData.name || d.region === 'Global'
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Datasets', href: '/datasets' },
                { label: countryData.name, href: `/datasets/${slug}` },
                { label: cityData.name, href: `/datasets/${slug}/${city}` }
            ]} />

            <Hero
                heading={`${cityData.name} B2B Database`}
                subheading={`Reach decision makers and companies in ${cityData.name}, ${countryData.name}. Verified direct dials and emails for high-converting campaigns.`}
            >
                <div className="flex gap-4 justify-center">
                    <LeadCaptureTrigger asChild>
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Get Sample Data
                        </Link>
                    </LeadCaptureTrigger>
                </div>
            </Hero>

            <Section>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Target Audience in {cityData.name}</h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Stop wasting budget on broad, inaccurate lists. Our {cityData.name} data allows you to filter by specific criteria to reach your ideal customer profile (ICP).
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center"><span className="mr-2 text-primary">✓</span> Verified local business contacts</li>
                            <li className="flex items-center"><span className="mr-2 text-primary">✓</span> Seniority and department filters</li>
                            <li className="flex items-center"><span className="mr-2 text-primary">✓</span> Direct mobile numbers & emails</li>
                        </ul>
                    </div>
                    <div className="bg-muted/20 p-6 rounded-xl border">
                        <h3 className="font-bold mb-4">Available Data Points</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-background p-3 rounded border text-center">CEO / Founder</div>
                            <div className="bg-background p-3 rounded border text-center">CTO / IT Head</div>
                            <div className="bg-background p-3 rounded border text-center">HR Directors</div>
                            <div className="bg-background p-3 rounded border text-center">Sales Leaders</div>
                            <div className="bg-background p-3 rounded border text-center">Marketing VPs</div>
                            <div className="bg-background p-3 rounded border text-center">Finance Heads</div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-muted/10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold mb-2">Available Datasets</h2>
                    <p className="text-muted-foreground">Filter this data to target {cityData.name}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {countryDatasets.slice(0, 4).map(d => ( // Show top 4 relevant datasets
                        <Link key={d.slug} href={`/datasets/${d.slug}`} className="block p-6 bg-card border rounded-xl hover:border-primary transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {d.type}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-1">{d.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{d.description}</p>
                            <p className="text-xs font-medium text-primary">Available for {cityData.name} →</p>
                        </Link>
                    ))}
                </div>
            </Section>

            <CTA title={`Start Prospecting in ${cityData.name} Today`} />
        </div>
    )
}
