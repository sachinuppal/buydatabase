
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TIER_1_CITIES, ALL_CITIES, COUNTRIES } from '@/data/locations';
import { CORE_ROLES } from '@/data/roles';

import { Metadata } from 'next';

export async function generateStaticParams() {
    // Phase 1: Only India
    return [{ country: 'india' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
    const { country } = await params;
    return {
        title: `B2B Audiences in ${country === 'india' ? 'India' : country} | BuyDatabase.ai`,
        description: `Browse verified B2B audiences and decision makers in ${country === 'india' ? 'India' : country}.`,
        alternates: {
            canonical: `https://www.buydatabase.ai/audiences/${country}`,
        }
    };
}

export default async function LocationHubPage({ params }: { params: Promise<{ country: string }> }) {
    const { country } = await params;

    if (country !== 'india') return notFound(); // Partial support for now

    const countryName = "India";
    const cities = TIER_1_CITIES;

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Location', href: '/audiences/by-location' },
                { label: countryName, href: `/audiences/${country}` }
            ]} />

            <Hero
                heading={`Audience Data for ${countryName}`}
                subheading={`Reach verified professionals and decision makers across all major cities in ${countryName}.`}
            />

            <Section>
                <div className="grid md:grid-cols-3 gap-6">
                    {cities.map(city => (
                        <Link key={city.slug} href={`/audiences/${country}/${city.slug}`} className="block p-6 border rounded-xl hover:border-primary transition-colors">
                            <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                            <p className="text-sm text-muted-foreground">View all audiences in {city.name} →</p>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    );
}
