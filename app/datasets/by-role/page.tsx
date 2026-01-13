
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ALL_ROLES } from '@/data/roles';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Datasets by Role | BuyDatabase.ai",
    description: "Browse audience datasets segmented by job function and seniority.",
};

export default function DatasetsByRoleIndex() {
    const parentRoles = ALL_ROLES.slice(0, 12); // Just show top roles for now

    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                heading="Datasets by Role"
                subheading="Find the exact data you need based on job title."
            />

            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-4">
                        {parentRoles.map((role) => (
                            <Link key={role.slug} href={`/datasets/by-role/${role.slug}`} className="block p-4 border rounded-lg hover:border-primary hover:bg-muted/10 transition-colors">
                                <h3 className="font-bold">{role.name}</h3>
                                <p className="text-sm text-muted-foreground">Get {role.singular} data.</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    )
}
