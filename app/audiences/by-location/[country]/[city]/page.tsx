
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ALL_CITIES, COUNTRIES } from '@/data/locations';
import { ALL_ROLES } from '@/data/roles';
import { DATASETS } from '@/data/datasets';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, MapPin, Database } from 'lucide-react';

interface Params {
    country: string;
    city: string;
}

// Generate static params for all cities
export async function generateStaticParams() {
    return ALL_CITIES.map((city) => ({
        country: city.country.toLowerCase().replace(/ /g, '-'), // e.g., 'india'
        city: city.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { country, city: citySlug } = await params;
    const cityData = ALL_CITIES.find(c => c.slug === citySlug);

    if (!cityData) return {};

    return {
        title: `${cityData.name} Audiences by Role & Industry | BuyDatabase.ai`,
        description: `Explore verified business audiences in ${cityData.name}. Browse by role, seniority, industry, and use case—ideal for outbound, ABM, recruitment, and market research.`,
    };
}

export default async function CityIndexPage({ params }: { params: Promise<Params> }) {
    const { country, city: citySlug } = await params;
    const cityData = ALL_CITIES.find(c => c.slug === citySlug);
    const countryData = COUNTRIES.find(c => c.slug === country);

    if (!cityData) {
        notFound();
    }

    // Filter relevant datasets (Mock logic: if dataset region matches or is global/country)
    const cityDatasets = DATASETS.filter(d =>
        (d.slug.includes(citySlug) || d.region.toLowerCase() === country)
    ).slice(0, 8);

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Audiences in ${cityData.name}`,
        "description": `Explore business audiences in ${cityData.name} by role, seniority, and use case.`,
        "url": `https://buydatabase.ai/audiences/by-location/${country}/${citySlug}/`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://buydatabase.ai/" },
                { "@type": "ListItem", "position": 2, "name": "Audiences", "item": "https://buydatabase.ai/audiences/" },
                { "@type": "ListItem", "position": 3, "name": "By Location", "item": "https://buydatabase.ai/audiences/by-location/" },
                { "@type": "ListItem", "position": 4, "name": countryData?.name || country, "item": `https://buydatabase.ai/audiences/by-location/${country}/` },
                { "@type": "ListItem", "position": 5, "name": cityData.name, "item": `https://buydatabase.ai/audiences/by-location/${country}/${citySlug}/` }
            ]
        }
    };

    const roleItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Roles in ${cityData.name}`,
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": ALL_ROLES.length,
        "itemListElement": ALL_ROLES.slice(0, 20).map((role, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": `${role.name} in ${cityData.name}`,
            "url": `https://buydatabase.ai/audiences/${country}/${citySlug}/${role.slug}/`
        }))
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, roleItemList]) }}
            />

            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Location', href: '/audiences/by-location' },
                { label: countryData?.name || country, href: `/audiences/by-location/${country}` }, // Route might need to exist
                { label: cityData.name, href: `/audiences/by-location/${country}/${citySlug}` }
            ]} />

            <Hero
                heading={`Audiences in ${cityData.name}`}
                subheading={`Explore ${cityData.name}'s business landscape. Connect with key decision makers across industries.`}
            />

            <Section>
                {/* 1. Intro */}
                <div className="max-w-3xl mx-auto mb-16 text-lg text-muted-foreground">
                    <p className="mb-4">
                        {cityData.name} is a key hub for business activity. Targeting audiences here allows for localized messaging, better conversion rates, and more relevant campaign context.
                    </p>
                    <p>
                        Whether you are running outbound sales, ABM for enterprise accounts, or recruitment drives, starting with a city-specific segment ensures you are reaching the right people in the right place.
                    </p>
                </div>

                {/* 2. Roles Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-heading font-bold mb-8">Roles in {cityData.name}</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {ALL_ROLES.map((role) => (
                            <Link
                                key={role.slug}
                                href={`/audiences/${country}/${citySlug}/${role.slug}`}
                                className="group flex items-center p-4 bg-muted/10 border rounded-lg hover:border-primary transition-colors"
                            >
                                <span className="font-medium text-sm">{role.name} in {cityData.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3. Popular Datasets */}
                <div className="mb-20 bg-muted/20 p-8 rounded-2xl">
                    <h2 className="text-3xl font-heading font-bold mb-8">Popular Datasets for {cityData.name}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {cityDatasets.length > 0 ? cityDatasets.map((d) => (
                            <Link key={d.slug} href={`/datasets/${d.slug}`} className="block bg-background p-6 rounded-xl border hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{d.name}</h3>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">{d.description}</p>
                            </Link>
                        )) : (
                            <div className="col-span-2 text-center text-muted-foreground">
                                Browse our country-wide datasets for {countryData?.name}. <Link href={`/datasets/${country}`} className="text-primary hover:underline">View all</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. FAQs */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-heading font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: `What is a ${cityData.name} audience dataset?`, a: `A ${cityData.name} audience dataset is a verified list of business professionals and companies based in ${cityData.name}, segmented by role and industry.` },
                            { q: `Which roles can I target in ${cityData.name}?`, a: `You can target a wide range of roles including Founders, CXOs, HR Managers, Marketing Leaders, and Sales Heads within ${cityData.name}.` },
                            { q: `How is data refreshed and verified?`, a: `Our data is continuously verified using multi-source validation to ensure email deliverability and profile accuracy for ${cityData.name} professionals.` },
                            { q: `Can I request a custom ${cityData.name} segment?`, a: `Yes, we offer custom audience building services. If you need a niche segment in ${cityData.name}, contact our team.` }
                        ].map((faq, i) => (
                            <div key={i} className="bg-card border p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. CTA */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-6">Ready to activate your campaign in {cityData.name}?</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact"><Button size="lg">Talk to an expert</Button></Link>
                        <Link href="/datasets"><Button variant="outline" size="lg">Explore all datasets</Button></Link>
                    </div>
                </div>

            </Section>
        </div>
    )
}
