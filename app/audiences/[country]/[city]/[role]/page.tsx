
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidCombo } from '@/data/programmatic-config';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CTA } from '@/components/ui/cta';
import { Check, Target, Users, AlertCircle, Briefcase } from 'lucide-react';
import { Metadata } from 'next';
import { CORE_ROLES, ALL_ROLES, getRoleContent } from '@/data/roles';
import { TIER_1_CITIES, ALL_CITIES } from '@/data/locations';
import { DATASETS } from '@/data/datasets';

// Generate params for the 80 whitelisted pages + any extras defined in config
// Note: In a real build we might optimize this to not run every time, but for 80 pages it's instant.
import { getAllComboSlugs } from '@/data/programmatic-config';

export async function generateStaticParams() {
    const combos = getAllComboSlugs();
    return combos.map(c => ({
        country: c.country,
        city: c.city,
        role: c.role
    }));
}

export async function generateMetadata({ params }: { params: { country: string; city: string; role: string } }): Promise<Metadata> {
    const { country, city, role } = params;

    // Safety check (though generateStaticParams handles this for build, dynamic requests need it)
    if (!isValidCombo(city, role)) return {};

    const roleName = ALL_ROLES.find(r => r.slug === role)?.name || role;
    const cityName = ALL_CITIES.find(c => c.slug === city)?.name || city;
    const countryName = country.charAt(0).toUpperCase() + country.slice(1); // Helper to capitalize

    return {
        title: `${roleName} in ${cityName}, ${countryName} – Reach & Activate This Audience`,
        description: `Explore ${roleName} in ${cityName}, ${countryName} with campaign-ready audience insights. Understand who they are, why they matter, and how to activate this audience responsibly.`,
    };
}

export default function AudienceComboPage({ params }: { params: { country: string; city: string; role: string } }) {
    const { country, city, role } = params;

    if (!isValidCombo(city, role)) {
        notFound();
    }

    const roleObj = ALL_ROLES.find(r => r.slug === role);
    const cityObj = ALL_CITIES.find(c => c.slug === city);

    const roleName = roleObj?.name || role;
    const roleSingular = roleObj?.singular || role;
    const cityName = cityObj?.name || city;
    const countryName = country.charAt(0).toUpperCase() + country.slice(1);

    // Get Dynamic Content
    const content = getRoleContent(role);

    // Schema Data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Audiences", "item": "https://buydatabase.ai/audiences/" },
            { "@type": "ListItem", "position": 2, "name": "India", "item": "https://buydatabase.ai/audiences/by-location/india/" },
            { "@type": "ListItem", "position": 3, "name": cityName, "item": `https://buydatabase.ai/audiences/by-location/india/${city}/` },
            { "@type": "ListItem", "position": 4, "name": roleName, "item": `https://buydatabase.ai/audiences/india/${city}/${role}/` }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Who are ${roleName} in ${cityName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${roleName} in ${cityName} are professionals responsible for decision-making and operations within their function across companies operating in the region.`
                }
            },
            {
                "@type": "Question",
                "name": `How can businesses reach ${roleName} in ${cityName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Businesses can reach this audience through targeted campaigns such as email outreach, LinkedIn advertising, and account-based marketing using structured audience insights."
                }
            }
        ]
    };

    // Dataset Mapping (simplified for Phase 1)
    let datasetSlug = 'india-b2b-professionals';
    if (role === 'hr-managers' || role === 'talent-acquisition-leads') datasetSlug = 'india-hr-and-talent-leaders';
    else if (role === 'cto' || role === 'product-managers') datasetSlug = 'india-it-decision-makers';
    else if (role === 'founders' || role === 'ceo') datasetSlug = 'india-founders-and-cofounders';
    else if (role === 'sales-heads') datasetSlug = 'india-sales-and-growth-leaders';
    else if (role === 'marketing-managers') datasetSlug = 'india-marketing-and-demand-generation-leaders-india'; // Fallback if exists or base

    // Check if map target exists, else safe fallback
    const linkedDataset = DATASETS.find(d => d.slug === datasetSlug) || DATASETS[0];


    return (
        <div className="flex flex-col min-h-screen">
            {/* Inject Schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Location', href: '/audiences/by-location' },
                { label: 'India', href: '/audiences/by-location/india' },
                { label: cityName, href: `/audiences/india/${city}` },
                { label: roleName, href: `/audiences/india/${city}/${role}` } // Current
            ]} />

            <Hero
                heading={`${roleName} in ${cityName}, ${countryName}`}
                subheading={`${cityName} is a key hub for ${roleSingular}s. BuyDatabase.ai helps you understand, segment, and activate this audience without relying on outdated lists.`}
                align="left"
            >
                {/* Intro (Above the Fold) part 2 essentially */}
                <p className="sr-only">
                    {/* Accessibly hidden extra SEO text if needed, or just let the subheading do the work. 
                        The user asked for 'Intro (Above the Fold)' text which we put in the Hero subheading/Section below. */}
                </p>
            </Hero>

            <Section>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        {/* Who Are... */}
                        <div>
                            <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">
                                Who Are {roleName} in {cityName}?
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                {roleName} in {cityName} typically oversee:
                            </p>
                            <ul className="space-y-2">
                                {content.whoAreThey.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm md:text-base text-muted-foreground">
                                        <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 p-4 bg-muted/20 rounded-lg text-sm text-muted-foreground">
                                They operate across SaaS, IT Services, Startups, and traditional industries within the {cityName} cluster.
                            </div>
                        </div>

                        {/* Why They Matter... */}
                        <div>
                            <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">
                                Why This Audience Matters Commercially
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                {roleName} are high-value targets because they are:
                            </p>
                            <ul className="space-y-2">
                                {content.whyTheyMatter.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm md:text-base text-muted-foreground">
                                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                        <span className="font-medium text-foreground mr-1">Signal:</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Challenges */}
                        <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
                            <h3 className="text-xl font-bold font-heading mb-4 flex items-center">
                                <AlertCircle className="h-5 w-5 text-primary mr-2" />
                                Common Challenges
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Effective campaigns speak directly to these pain points:
                            </p>
                            <ul className="space-y-3">
                                {content.challenges.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                                        <Target className="mr-2 h-4 w-4 text-muted-foreground/70 mt-1 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Attributes */}
                        <div className="bg-secondary/20 p-6 md:p-8 rounded-2xl border border-secondary/20">
                            <h3 className="text-xl font-bold font-heading mb-4 flex items-center">
                                <Users className="h-5 w-5 text-primary mr-2" />
                                Available Audience Attributes
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Segmentation fields available for {roleName}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Job role & seniority", "Industry & company size", "Company growth stage", "Location clusters", "Hiring signals", "Digital intent"].map(attr => (
                                    <span key={attr} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background border text-muted-foreground">
                                        {attr}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                <span className="mr-2">🔒</span>
                                Sensitive personal data is never exposed publicly.
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* How Teams Target... */}
            <Section className="bg-muted/30">
                <h2 className="text-3xl font-bold font-heading text-center mb-10">
                    How Teams Target {roleName} in {cityName}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {content.useCases.map((useCase, i) => (
                        <div key={i} className="bg-background p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="flex items-center font-bold mb-3 text-lg">
                                <Briefcase className="h-5 w-5 text-primary mr-2" />
                                {useCase.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {useCase.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Activation CTA */}
            <Section>
                <div className="bg-premium-gradient rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                        Activate This Audience
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        You don’t buy a list of {roleName}. You activate a relevant, campaign-ready audience.
                        Use BuyDatabase.ai to launch targeted outreach, test messaging, and scale responsibly.
                    </p>
                    <Link href={`/datasets/${linkedDataset.slug}`}>
                        <Button size="xl" variant="secondary" className="font-bold text-primary hover:text-primary/90">
                            Activate {roleName} in {cityName} <span className="ml-2">→</span>
                        </Button>
                    </Link>
                </div>
            </Section>

            {/* Related Sections */}
            <Section className="py-8 border-t">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold mb-4 font-heading">Related Audiences</h4>
                        <div className="flex flex-wrap gap-3">
                            {/* Sideways Linking - Same City, diff roles */}
                            {ALL_ROLES.slice(0, 3).map(r => (
                                <Link key={r.slug} href={`/audiences/india/${city}/${r.slug}`} className="text-sm text-primary hover:underline bg-muted/30 px-3 py-1 rounded">
                                    {r.name} in {cityName}
                                </Link>
                            ))}
                            <Link href={`/audiences/by-location/india/${city}`} className="text-sm text-muted-foreground hover:underline px-3 py-1">
                                All Audiences in {cityName}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 font-heading">Related Datasets</h4>
                        <div className="flex flex-col gap-2">
                            <Link href={`/datasets/${linkedDataset.slug}`} className="text-sm font-medium text-primary hover:underline">
                                {linkedDataset.name}
                            </Link>
                            <Link href="/datasets" className="text-sm text-muted-foreground hover:underline">
                                Browse All Datasets
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
