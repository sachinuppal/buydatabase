import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { getRelatedAudiencesForDataset } from '@/lib/internal-linking';
import { DATASETS, getDatasetBySlug } from '@/data/datasets';
import { ALL_CITIES, COUNTRIES } from '@/data/locations'; // Import Regions
import { Hero } from '@/components/ui/hero';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CTA } from '@/components/ui/cta';
import { Check, Shield, TrendingUp, Users } from 'lucide-react';
import { Metadata } from 'next';
import { getAllComboSlugs, isValidCombo } from '@/data/programmatic-config';

// Force static generation for known datasets AND countries
export async function generateStaticParams() {
    const datasetParams = DATASETS.map((dataset) => ({
        slug: dataset.slug,
    }));

    // Add Country Slugs to the static paths
    const countryParams = COUNTRIES.map(c => ({
        slug: c.slug
    }));

    return [...datasetParams, ...countryParams];
}

// Helper to check if slug is a country
function getCountryData(slug: string) {
    return COUNTRIES.find(c => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const dataset = getDatasetBySlug(slug);

    if (dataset) {
        return {
            title: `${dataset.name} Dataset Only - BuyDatabase.ai`,
            description: `Activate ${dataset.name}. Reach high-intent audiences in ${dataset.region}. Verified, compliant data for email, LinkedIn, and ad campaigns.`,
        };
    }

    const country = getCountryData(slug);
    if (country) {
        return {
            title: `${country.name} B2B Datasets - BuyDatabase.ai`,
            description: `Explore high-quality, verified B2B data for ${country.name}. Target decision makers, specific industries, and roles.`,
        };
    }

    return {};
}


export default async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Try to match a Dataset
    const dataset = getDatasetBySlug(slug);

    // 2. If it is a Dataset, render Dataset Page
    if (dataset) {
        const relatedAudiences = getRelatedAudiencesForDataset(slug);
        const matchType = dataset.type === 'Role' ? 'Job Role'
            : dataset.type === 'Industry' ? 'Industry'
                : dataset.type === 'Intent' ? 'Buying Intent'
                    : 'Dataset';
        // Generate related combos (simplified static list for now, ideally dynamic)
        const relatedCombos = [
            { city: 'bangalore', role: 'founders', label: 'Founders in Bangalore' },
            { city: 'mumbai', role: 'marketing-managers', label: 'Marketing Managers in Mumbai' },
            { city: 'delhi', role: 'sales-heads', label: 'Sales Heads in Delhi' },
            { city: 'pune', role: 'hr-managers', label: 'HR Managers in Pune' },
            { city: 'hyderabad', role: 'cto', label: 'CTOs in Hyderabad' },
        ];

        return (
            <div className="flex flex-col min-h-screen">
                <Breadcrumbs
                    items={[
                        { label: 'Datasets', href: '/datasets' },
                        { label: dataset.name, href: `/datasets/${dataset.slug}` },
                    ]}
                />

                {/* Schema.org Dataset Markup */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Dataset",
                            "name": dataset.name,
                            "description": dataset.description,
                            "includedInDataCatalog": {
                                "@type": "DataCatalog",
                                "name": "BuyDatabase.ai"
                            },
                            "spatialCoverage": dataset.region
                        })
                    }}
                />

                <Hero
                    heading={`${dataset.name} – Campaign-Ready Audience Dataset`}
                    subheading={`Access ${dataset.recordCount || 'verified'} records. Identify, understand, and activate ${dataset.name} professionals with precision.`}
                >
                    <LeadCaptureTrigger asChild>
                        <Button size="xl" variant="premium">Activate This Audience</Button>
                    </LeadCaptureTrigger>
                </Hero>

                <Section title="What This Dataset Includes">
                    <div className="grid gap-8 md:grid-cols-2 items-center">
                        <div className="space-y-4">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                This dataset contains professionally profiled audiences structured for multi-channel activation. We move beyond simple lists to provide <strong>rich intelligence</strong> that powers ABM and high-conversion reach outs.
                            </p>
                            <ul className="space-y-3 mt-4">
                                {[
                                    "First name & last name",
                                    "Job role & seniority",
                                    "Company name & industry",
                                    "Company size & growth stage",
                                    "Verified digital signals",
                                    "Location (City, State, Country)"
                                ].map(feature => (
                                    <li key={feature} className="flex items-center text-foreground">
                                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sample Table (Masked) */}
                        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b bg-muted/20">
                                <h3 className="font-semibold text-sm">Sample Audience Preview (Masked)</h3>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/10 text-muted-foreground">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Role</th>
                                            <th className="px-6 py-3 font-medium">Industry</th>
                                            <th className="px-6 py-3 font-medium">City</th>
                                            <th className="px-6 py-3 font-medium">Size</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {[
                                            { role: "Founder", ind: "SaaS", city: "Bangalore", size: "11-50" },
                                            { role: "Marketing Head", ind: "Retail", city: "Mumbai", size: "201-500" },
                                            { role: "VP Sales", ind: "Finance", city: "Delhi", size: "1000+" },
                                            { role: "Product Manager", ind: "EdTech", city: "Pune", size: "51-200" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-muted/5">
                                                <td className="px-6 py-3">{row.role}</td>
                                                <td className="px-6 py-3">{row.ind}</td>
                                                <td className="px-6 py-3">{row.city}</td>
                                                <td className="px-6 py-3">{row.size}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-3 bg-muted/10 text-xs text-muted-foreground text-center">
                                🔒 PII masked for public preview. Full access available on request.
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Coverage & Use Cases */}
                <Section className="bg-muted/20">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-background rounded-xl border shadow-sm">
                            <Shield className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-xl font-heading font-bold mb-2">Compliance First</h3>
                            <p className="text-muted-foreground text-sm">
                                Operates with consent-aware sourcing and aggregated professional intelligence. Designed for responsible outreach, not spam.
                            </p>
                        </div>
                        <div className="p-6 bg-background rounded-xl border shadow-sm">
                            <TrendingUp className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-xl font-heading font-bold mb-2">Growth Ready</h3>
                            <p className="text-muted-foreground text-sm">
                                Perfect for Email & LinkedIn outreach, Lookalike audience creation, and Account-based marketing (ABM).
                            </p>
                        </div>
                        <div className="p-6 bg-background rounded-xl border shadow-sm">
                            <Users className="h-8 w-8 text-primary mb-4" />
                            <h3 className="text-xl font-heading font-bold mb-2">Deep Coverage</h3>
                            <p className="text-muted-foreground text-sm">
                                Covers {dataset.region} with strong density in key business hubs and industries relevant to {dataset.name}.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Internal Links: Related Audiences */}
                <Section title="Related Audience Combinations">
                    <div className="flex flex-wrap gap-3">
                        {relatedCombos.map(combo => (
                            <Link
                                key={combo.label}
                                href={`/audiences/${dataset.region.toLowerCase() === 'india' ? 'india' : 'global'}/${combo.city}/${combo.role}/`}
                                className="inline-flex items-center px-4 py-2 rounded-full border bg-background hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                            >
                                {combo.label}
                            </Link>
                        ))}
                        <Link
                            href="/audiences"
                            className="inline-flex items-center px-4 py-2 rounded-full border border-dashed bg-muted/50 hover:bg-muted text-sm font-medium"
                        >
                            View All Audiences
                        </Link>
                    </div>
                </Section>

                <CTA />
            </div>
        );
    }

    // 3. Try to match a Country
    const country = getCountryData(slug);
    if (country) {
        const validRegions = [country.name, 'Global'];
        const countryDatasets = DATASETS.filter(d =>
            d.region.toLowerCase() === slug.toLowerCase() ||
            d.region === 'Global'
        );

        // Get Top Cities for this country to display
        const topCities = ALL_CITIES.filter(c => c.country === country.name).slice(0, 12);

        return (
            <div className="flex flex-col min-h-screen">
                <Breadcrumbs items={[
                    { label: 'Datasets', href: '/datasets' },
                    { label: country.name, href: `/datasets/${slug}` }
                ]} />

                <Hero
                    heading={`${country.name} B2B Datasets`}
                    subheading={`Explore high-quality, verified B2B data for ${country.name}. Target decision makers, specific industries, and roles.`}
                />

                {/* City Quick Links */}
                {topCities.length > 0 && (
                    <Section className="py-8 bg-muted/10 border-b">
                        <Container>
                            <h2 className="text-lg font-bold mb-4">Browse by City</h2>
                            <div className="flex flex-wrap gap-2">
                                {topCities.map(city => (
                                    <Link
                                        key={city.slug}
                                        href={`/datasets/${slug}/${city.slug}`}
                                        className="px-3 py-1 bg-background border rounded-full text-sm hover:border-primary transition-colors"
                                    >
                                        {city.name}
                                    </Link>
                                ))}
                            </div>
                        </Container>
                    </Section>
                )}


                <Section>
                    <div className="grid md:grid-cols-2 gap-6">
                        {countryDatasets.map(d => (
                            <Link key={d.slug} href={`/datasets/${d.slug}`} className="block p-6 bg-card border rounded-xl hover:border-primary transition-colors group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                                        {d.type}
                                    </span>
                                    {d.recordCount && (
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                            {d.recordCount} Records
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{d.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{d.description}</p>
                            </Link>
                        ))}
                        {countryDatasets.length === 0 && (
                            <div className="col-span-2 text-center py-12 text-muted-foreground">
                                No specific datasets found for {country.name} yet. <Link href="/contact" className="underline text-primary">Request Custom Data</Link>.
                            </div>
                        )}
                    </div>
                </Section>
            </div>
        );
    }

    // 4. Fallback: 404
    notFound();
}
