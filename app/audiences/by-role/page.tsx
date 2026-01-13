
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Business Audiences by Role & Seniority | BuyDatabase.ai",
    description: "Explore business audiences by role and seniority. Understand decision-makers, influencers, and operators across functions and industries.",
};

export default function AudiencesByRolePage() {
    const roleCategories = [
        {
            title: "Leadership & Decision Makers",
            roles: [
                { name: "Founders & Co-founders", slug: "founders" },
                { name: "CEOs & Managing Directors", slug: "ceo" },
                { name: "CXOs (CFO, CTO, CMO, COO)", slug: "cxo" },
                { name: "Board Members & Advisors", slug: "board-members" },
            ]
        },
        {
            title: "Marketing & Growth",
            roles: [
                { name: "Marketing Leaders", slug: "marketing-leaders" },
                { name: "Growth & Demand Gen Managers", slug: "growth-leaders" },
                { name: "Performance Marketing Managers", slug: "performance-marketing" },
                { name: "Brand & Communications Heads", slug: "brand-leaders" },
            ]
        },
        {
            title: "Sales & Revenue",
            roles: [
                { name: "Sales Leaders", slug: "sales-leaders" },
                { name: "Business Development Managers", slug: "business-development" },
                { name: "Revenue Operations (RevOps)", slug: "revops" },
                { name: "Channel & Partnerships Heads", slug: "partnerships" },
            ]
        },
        {
            title: "HR & People Operations",
            roles: [
                { name: "HR Managers", slug: "hr-managers" },
                { name: "Talent Acquisition Leaders", slug: "talent-acquisition" },
                { name: "People Operations Leaders", slug: "people-ops" },
                { name: "Learning & Development Heads", slug: "learning-development" },
            ]
        },
        {
            title: "Technology & Product",
            roles: [
                { name: "CTOs & Engineering Leaders", slug: "technology-leaders" },
                { name: "Product Managers & Heads", slug: "product-leaders" },
                { name: "IT & Infrastructure Heads", slug: "it-leaders" },
                { name: "Data & Analytics Leaders", slug: "data-leaders" },
            ]
        },
        {
            title: "Finance, Legal & Operations",
            roles: [
                { name: "Finance Leaders (CFO / FP&A)", slug: "finance-leaders" },
                { name: "Procurement & Supply Chain Heads", slug: "procurement" },
                { name: "Operations & Strategy Leaders", slug: "operations-leaders" },
                { name: "Legal & Compliance Heads", slug: "legal-leaders" },
            ]
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Audiences', href: '/audiences' },
                { label: 'By Role', href: '/audiences/by-role' }
            ]} />

            <Hero
                heading="Explore Audiences by Role"
                subheading="Role-based targeting is the foundation of effective B2B campaigns. Organize audiences by function, responsibility, and seniority."
            />

            <Section>
                <div className="grid lg:grid-cols-2 gap-12">
                    {roleCategories.map((cat, i) => (
                        <div key={i} className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold font-heading mb-6 flex items-center text-primary">
                                {cat.title}
                            </h2>
                            <ul className="space-y-3">
                                {cat.roles.map((role) => (
                                    <li key={role.slug}>
                                        <Link
                                            href={`/audiences/by-role/${role.slug}`}
                                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                                        >
                                            <span className="font-medium">{role.name}</span>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/audiences/by-location">
                            <Button variant="default">Browse by location</Button>
                        </Link>
                        <Link href="/datasets">
                            <Button variant="outline">Explore datasets</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    )
}
