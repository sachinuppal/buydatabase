
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight, MapPin } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Business Audiences by Location | BuyDatabase.ai",
    description: "Browse business audiences by city and region. Discover who to target in each location for outbound, ABM, recruitment, and demand generation campaigns.",
};

export default function AudiencesByLocationPage() {
    const topCities = [
        { name: "Bangalore", slug: "bangalore" },
        { name: "Mumbai", slug: "mumbai" },
        { name: "Delhi NCR", slug: "delhi" },
        { name: "Pune", slug: "pune" },
        { name: "Hyderabad", slug: "hyderabad" },
        { name: "Chennai", slug: "chennai" },
        { name: "Gurgaon", slug: "gurgaon" },
        { name: "Noida", slug: "noida" },
        { name: "Ahmedabad", slug: "ahmedabad" },
        { name: "Kolkata", slug: "kolkata" },
        { name: "Jaipur", slug: "jaipur" },
        { name: "Chandigarh", slug: "chandigarh" },
        { name: "Indore", slug: "indore" },
        { name: "Bhopal", slug: "bhopal" },
        { name: "Nagpur", slug: "nagpur" },
        { name: "Coimbatore", slug: "coimbatore" },
        { name: "Kochi", slug: "kochi" },
        { name: "Trivandrum", slug: "trivandrum" },
        { name: "Vizag", slug: "visakhapatnam" },
        { name: "Surat", slug: "surat" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Location', href: '/audiences/by-location' }
            ]} />

            <Hero
                heading="Explore Audiences by Location"
                subheading="Location plays a critical role in campaign performance. Tailor messaging to local context and prioritize high-density business hubs."
            />

            <Section>
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl font-heading font-bold mb-8 flex items-center">
                        <MapPin className="h-8 w-8 text-primary mr-3" />
                        India – Major Business Cities
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {topCities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/audiences/by-location/india/${city.slug}`}
                                className="group p-4 bg-card border rounded-lg hover:border-primary hover:shadow-sm transition-all flex items-center justify-between"
                            >
                                <span className="font-medium">{city.name} Audiences</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-muted/30 p-8 rounded-2xl text-center max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold font-heading mb-4">Start Targeting Today</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/audiences">
                            <Button variant="default">View audience combinations</Button>
                        </Link>
                        <Link href="/audiences/by-role">
                            <Button variant="outline">Browse by role</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    )
}
