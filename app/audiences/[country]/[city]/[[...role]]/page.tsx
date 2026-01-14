
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CTA } from '@/components/ui/cta';
import { TIER_1_CITIES, ALL_CITIES, COUNTRIES } from '@/data/locations';
import { ALL_ROLES, getRoleContent } from '@/data/roles';
import { Metadata } from 'next';
import { Check, Shield, TrendingUp, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRelatedRoles, getNearbyCities, getRelevantDatasets } from '@/lib/internal-linking';
import { AllDatasetsList } from '@/components/home/all-datasets-list';

// VALIDATION UTILS
function getCityData(slug: string) {
    return ALL_CITIES.find(c => c.slug === slug);
}

function getRoleData(slug: string | undefined) {
    if (!slug) return null;
    return ALL_ROLES.find(r => r.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; city: string; role?: string[] }> }): Promise<Metadata> {
    const { country, city: citySlug, role: rolePath } = await params;

    const city = getCityData(citySlug);
    const roleSlug = rolePath?.[0];
    const role = getRoleData(roleSlug);

    if (!city || (roleSlug && !role)) return {}; // Will 404

    if (role) {
        // COMBO METADATA
        return {
            title: `${role.name} in ${city.name} - Verified B2B Database`,
            description: `Connect with ${role.name} in ${city.name}. Access verified emails and phone numbers for ${role.singular} professionals in ${city.name}, ${country}.`
        };
    } else {
        // CITY HUB METADATA
        return {
            title: `B2B Audiences in ${city.name} - BuyDatabase.ai`,
            description: `Browse verified B2B audiences and decision makers in ${city.name}, ${country}. Filter by role, industry, and intent.`
        };
    }
}

export async function generateStaticParams() {
    // Generate params for Phase 1: Tier 1 Cities ONLY
    // We include both city-only paths AND city+role paths
    const params = [];

    for (const city of TIER_1_CITIES) {
        // 1. City Hub Path
        params.push({ country: 'india', city: city.slug, role: [] });

        // 2. Combo Paths (Core Roles to ensure they are built)
        for (const role of ALL_ROLES) {
            params.push({ country: 'india', city: city.slug, role: [role.slug] });
        }
    }
    return params;
}

export default async function AudienceCatchAllPage({ params }: { params: Promise<{ country: string; city: string; role?: string[] }> }) {
    const { country, city: citySlug, role: rolePath } = await params;

    // 1. Validate Geo
    if (country !== 'india') return notFound(); // Phase 1 restriction
    const city = getCityData(citySlug);
    if (!city) return notFound();

    // 2. Determine Mode: City Hub vs. Role Combo
    const roleSlug = rolePath?.[0]; // [[...role]] gives an array
    const isCombo = !!roleSlug;

    // 3. Handle City Hub
    if (!isCombo) {
        return (
            <div className="flex flex-col min-h-screen">
                <Breadcrumbs items={[
                    { label: 'Audiences', href: '/audiences' },
                    { label: 'India', href: `/audiences/${country}` },
                    { label: city.name, href: `/audiences/${country}/${citySlug}` }
                ]} />

                <Hero
                    heading={`B2B Audiences in ${city.name}`}
                    subheading={`Connect with key decision makers and professionals in ${city.name}, ${city.country}.`}
                />

                <Section title={`Browse ${city.name} by Role`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {ALL_ROLES.map(r => (
                            <Link key={r.slug} href={`/audiences/${country}/${citySlug}/${r.slug}`} className="p-4 border rounded hover:bg-muted/50 text-sm font-medium">
                                {r.name} in {city.name}
                            </Link>
                        ))}
                    </div>
                </Section>
                <CTA />
            </div>
        );
    }

    // 4. Handle Role Combo
    const role = getRoleData(roleSlug);
    if (!role) return notFound(); // Invalid role slug

    // Content for Combo
    const roleContent = getRoleContent(role.slug);

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'India', href: `/audiences/${country}` },
                { label: city.name, href: `/audiences/${country}/${citySlug}` },
                { label: role.name, href: `/audiences/${country}/${citySlug}/${role.slug}` }
            ]} />

            {/* Schema.org Product/Service */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": `${role.name} Database in ${city.name}`,
                        "description": `Verified contact list of ${role.name} in ${city.name}.`,
                        "brand": {
                            "@type": "Brand",
                            "name": "BuyDatabase.ai"
                        },
                        "areaServed": city.name
                    })
                }}
            />

            <Hero
                heading={`${role.name} in ${city.name}`}
                subheading={`Instant access to verified ${role.singular} emails and phone numbers in ${city.name}. High accuracy compliant B2B data.`}
            >
                <LeadCaptureTrigger asChild>
                    <Button size="xl" variant="premium">Get This Data</Button>
                </LeadCaptureTrigger>
            </Hero>

            {/* Value Props */}
            <Section className="bg-muted/30">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-background rounded-xl border shadow-sm">
                        <Check className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Verified Contacts</h3>
                        <p className="text-muted-foreground text-sm">Direct emails and mobile numbers verified for ${role.name} in ${city.name}.</p>
                    </div>
                    <div className="p-6 bg-background rounded-xl border shadow-sm">
                        <Shield className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Data Compliance</h3>
                        <p className="text-muted-foreground text-sm">Strict adherence to privacy laws. Safe for cold outreach.</p>
                    </div>
                    <div className="p-6 bg-background rounded-xl border shadow-sm">
                        <TrendingUp className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">High Conversion</h3>
                        <p className="text-muted-foreground text-sm">Target decision makers who are actually active.</p>
                    </div>
                </div>
            </Section>

            {/* Role Specific Content */}
            <Section title={`Why Target ${role.name} in ${city.name}?`}>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Who They Are</h3>
                        <ul className="space-y-2 mb-6">
                            {roleContent.whoAreThey.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-primary mr-2">•</span> {item}
                                </li>
                            ))}
                        </ul>
                        <h3 className="font-bold text-lg mb-4">Key Challenges</h3>
                        <ul className="space-y-2">
                            {roleContent.challenges.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-primary mr-2">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-muted/10 p-8 rounded-xl border">
                        <h3 className="font-bold text-lg mb-4">Common Use Cases</h3>
                        <div className="space-y-4">
                            {roleContent.useCases.map((uc, i) => (
                                <div key={i}>
                                    <h4 className="font-semibold text-primary">{uc.title}</h4>
                                    <p className="text-sm text-muted-foreground">{uc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* INTERNAL LINKING MESH */}
            <Section className="bg-muted/10">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* 1. Related Roles in Same City */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Other Audiences in {city.name}</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {getRelatedRoles(role.slug).map(r => (
                                <Link
                                    key={r.slug}
                                    href={`/audiences/${country}/${citySlug}/${r.slug}`}
                                    className="flex items-center justify-between p-3 bg-background border rounded-lg hover:border-primary transition-all group"
                                >
                                    <span className="font-medium text-sm">{r.name} in {city.name}</span>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 2. Same Role in Nearby Cities */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">{role.name} in Other Cities</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {getNearbyCities(city.slug).map(c => (
                                <Link
                                    key={c.slug}
                                    href={`/audiences/${country}/${c.slug}/${role.slug}`}
                                    className="flex items-center justify-between p-3 bg-background border rounded-lg hover:border-primary transition-all group"
                                >
                                    <span className="font-medium text-sm">{role.name} in {c.name}</span>
                                    <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Related Datasets (Mesh Direction 3) */}
                <div className="mt-12 pt-8 border-t">
                    <h3 className="text-xl font-bold mb-6">Datasets covering {role.name}</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {getRelevantDatasets(`${role.name} ${city.name}`).map(dataset => (
                            <Link
                                key={dataset.slug}
                                href={`/datasets/${dataset.slug}`}
                                className="block p-5 bg-card border rounded-xl hover:shadow-md transition-all group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-primary group-hover:underline line-clamp-1">{dataset.name}</h4>
                                    <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-mono">
                                        {dataset.recordCount}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{dataset.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Explore All Datasets Section */}
            <Section className="bg-muted/30">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-heading font-bold mb-4">Browse all verified B2B datasets</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Instantly available for download or delivery. Context-first segmentation, not bulk dumps.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <AllDatasetsList />
                </div>
            </Section>

            <CTA />
        </div>
    );
}
