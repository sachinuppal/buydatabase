import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button, buttonVariants } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ALL_ROLES, getRoleContent } from '@/data/roles';
import { ROLE_GROUPS, RoleGroupSlug } from '@/data/role-groups';
import { getRelatedRoles, getTopCities, getRelevantDatasets } from '@/lib/internal-linking';
import { ALL_CITIES } from '@/data/locations';
import { DATASETS } from '@/data/datasets';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { LeadCaptureTrigger } from "@/components/lead-capture/lead-capture-trigger";
import { AllDatasetsList } from '@/components/home/all-datasets-list';

interface Params {
    role: string;
}

export async function generateStaticParams() {
    const roles = ALL_ROLES.map((role) => ({
        role: role.slug,
    }));
    const groups = Object.keys(ROLE_GROUPS).map((slug) => ({
        role: slug
    }));
    return [...roles, ...groups];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { role: roleSlug } = await params;

    // Check if it's a Group
    const groupData = ROLE_GROUPS[roleSlug as RoleGroupSlug];
    if (groupData) {
        return {
            title: `${groupData.title} Audience Lists | BuyDatabase.ai`,
            description: `${groupData.description} Find verified email and phone lists for ${groupData.title}.`,
            alternates: {
                canonical: `https://www.buydatabase.ai/audiences/by-role/${roleSlug}`,
            }
        };
    }

    // Check if it's a specific Role
    const roleData = ALL_ROLES.find(r => r.slug === roleSlug);
    if (!roleData) return {};

    return {
        title: `${roleData.name} Audience Lists by City & Industry | BuyDatabase.ai`,
        description: `Target ${roleData.name} audiences with city and industry filters. Built for outbound, ABM, hiring, partnerships, and market research workflows.`,
        alternates: {
            canonical: `https://www.buydatabase.ai/audiences/by-role/${roleSlug}`,
        }
    };
}

export default async function RoleIndexPage({ params }: { params: Promise<Params> }) {
    const { role: roleSlug } = await params;

    // ------------------------------------------------------------------
    // 1. GROUP VIEW (e.g., /audiences/by-role/hr-and-talent/)
    // ------------------------------------------------------------------
    const groupData = ROLE_GROUPS[roleSlug as RoleGroupSlug];

    if (groupData) {
        return (
            <div className="flex flex-col min-h-screen">
                <Breadcrumbs items={[
                    { label: 'Audiences', href: '/audiences' },
                    { label: 'By Role', href: '/audiences/by-role' },
                    { label: groupData.title, href: `/audiences/by-role/${roleSlug}` }
                ]} />

                <Hero
                    heading={groupData.title}
                    subheading={groupData.description}
                />

                <Section>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8">Browse Roles in this Category</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {groupData.roles.map((subRoleSlug) => {
                                const role = ALL_ROLES.find(r => r.slug === subRoleSlug);
                                if (!role) return null;
                                return (
                                    <Link key={role.slug} href={`/audiences/by-role/${role.slug}`} className="block bg-card p-6 rounded-xl border hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{role.name}</h3>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">Find data for {role.name}.</p>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </Section>
            </div>
        );
    }

    // ------------------------------------------------------------------
    // 2. SPECIFIC ROLE VIEW (e.g., /audiences/by-role/hr-managers/)
    // ------------------------------------------------------------------
    const roleData = ALL_ROLES.find(r => r.slug === roleSlug);

    if (!roleData) {
        notFound();
    }

    const content = getRoleContent(roleSlug);

    // Internal Linking Data & Smart Suggestions
    const topCities = getTopCities(8);
    const relatedRoles = getRelatedRoles(roleSlug, 4);

    // Smart dataset matching: check simple slug match OR description match
    const relevantDatasets = getRelevantDatasets(roleData.slug + " " + roleData.singular, 3);

    // Fallback logic if internal linking helper is empty (legacy safe)
    const roleDatasets = relevantDatasets.length > 0 ? relevantDatasets : DATASETS.filter(d =>
        d.slug.includes(roleSlug) || d.description.toLowerCase().includes(roleData.singular.toLowerCase())
    ).slice(0, 8);


    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${roleData.name} Audiences`,
        "description": `Target ${roleData.name} audiences with city and industry filters for outbound, ABM, and hiring.`,
        "url": `https://buydatabase.ai/audiences/by-role/${roleSlug}/`,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://buydatabase.ai/" },
                { "@type": "ListItem", "position": 2, "name": "Audiences", "item": "https://buydatabase.ai/audiences/" },
                { "@type": "ListItem", "position": 3, "name": "By Role", "item": "https://buydatabase.ai/audiences/by-role/" },
                { "@type": "ListItem", "position": 4, "name": roleData.name, "item": `https://buydatabase.ai/audiences/by-role/${roleSlug}/` }
            ]
        }
    };

    const cityItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Top cities for ${roleData.name}`,
        "numberOfItems": topCities.length,
        "itemListElement": topCities.map((city, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": `${roleData.name} in ${city.name}`,
            "url": `https://buydatabase.ai/audiences/${city.country.toLowerCase()}/${city.slug}/${roleSlug}/`
        }))
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, cityItemList]) }}
            />

            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Role', href: '/audiences/by-role' },
                { label: roleData.name, href: `/audiences/by-role/${roleSlug}` }
            ]} />

            <Hero
                heading={`${roleData.name} Audiences`}
                subheading={`Connect with ${roleData.name}. Decision makers, influencers, and leaders driving strategy in their organizations.`}
            />

            <Section>
                {/* 1. Intro Content */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-muted/10 p-8 rounded-2xl">
                        <h3 className="font-bold font-heading text-xl mb-4">Who are they?</h3>
                        <ul className="space-y-2">
                            {content.whoAreThey.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-muted/10 p-8 rounded-2xl">
                        <h3 className="font-bold font-heading text-xl mb-4">Why they matter?</h3>
                        <ul className="space-y-2">
                            {content.whyTheyMatter.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Explore More Section */}
                <div className="mb-20">
                    <div className="bg-primary/5 p-8 rounded-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Start Targeting {roleData.name} Today</h2>
                        <p className="mb-8 text-muted-foreground">Get instant access to verified direct dials and emails.</p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/pricing" className={buttonVariants({ size: "lg" })}>
                                View Pricing
                            </Link>
                            <LeadCaptureTrigger asChild>
                                <Button variant="outline" size="lg">Get Sample Data</Button>
                            </LeadCaptureTrigger>
                        </div>
                    </div>

                    {/* Internal Linking Mesh */}
                    <div className="mt-16 grid md:grid-cols-2 gap-12">
                        {/* 1. Browse by City */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Browse {roleData.singular} Lists by City</h3>
                            <ul className="space-y-2">
                                {topCities.map(city => (
                                    <li key={city.slug}>
                                        <Link href={`/audiences/india/${city.slug}/${roleData.slug}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                            {roleData.name} in {city.name}
                                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. Related Role Audiences */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Related Professionals</h3>
                            <ul className="space-y-2">
                                {relatedRoles.map(r => (
                                    <li key={r.slug}>
                                        <Link href={`/audiences/by-role/${r.slug}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                            {r.name}
                                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 3. Relevant Datasets */}
                    {relevantDatasets.length > 0 && (
                        <div className="mt-12">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Recommended Datasets</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {relevantDatasets.map(d => (
                                    <Link key={d.slug} href={`/datasets/${d.slug}`} className="block p-4 border rounded-lg hover:border-primary transition-colors group">
                                        <div className="font-medium group-hover:text-primary">{d.name}</div>
                                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{d.description}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* 2. Legacy Cities Grid (Keep generic location link for depth) */}
                <div className="mb-20">
                    <h2 className="text-3xl font-heading font-bold mb-8">Cities where {roleData.name} are concentrated (Detailed View)</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Re-using topCities generally, or we can use ALL_CITIES if we want a HUGE grid. 
                           For internal mesh, the list above above is sufficient, but let's keep a grid of 12 more cities */}
                        {ALL_CITIES.slice(0, 12).map((city) => (
                            <Link
                                key={city.slug}
                                href={`/audiences/${city.country.toLowerCase()}/${city.slug}/${roleSlug}`}
                                className="group flex items-center p-4 bg-background border rounded-lg hover:border-primary transition-colors"
                            >
                                <MapPin className="h-4 w-4 text-muted-foreground mr-2 group-hover:text-primary transition-colors" />
                                <span className="font-medium text-sm">{roleData.name} in {city.name}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Link href="/audiences/by-location" className="text-primary font-medium hover:underline inline-flex items-center">
                            View all location segments <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* 3. Popular Datasets (Fallback display) */}
                {/* Only show if we found more datasets than the top 3 displayed in mesh. */}
                {roleDatasets.length > 3 && (
                    <div className="mb-20">
                        <h2 className="text-3xl font-heading font-bold mb-8">More Datasets for {roleData.name}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {roleDatasets.slice(3, 7).map((d) => (
                                <Link key={d.slug} href={`/datasets/${d.slug}`} className="block bg-card p-6 rounded-xl border hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{d.name}</h3>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{d.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. CTA */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-6">Build a custom {roleData.singular} list</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Don't see exactly what you need? We can build a custom segment matching your specific criteria including seniority, technology stack, and intent.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <LeadCaptureTrigger asChild><Button size="lg">Request custom list</Button></LeadCaptureTrigger>
                        <Link href="/audiences"><Button variant="outline" size="lg">Explore other roles</Button></Link>
                    </div>
                </div>
                {/* Explore All Datasets Section */}
                <div className="mt-16 pt-12 border-t">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-heading font-bold mb-4">Browse all verified B2B datasets</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Instantly available for download or delivery. Context-first segmentation, not bulk dumps.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <AllDatasetsList />
                    </div>
                </div>

            </Section>
        </div>
    )
}
