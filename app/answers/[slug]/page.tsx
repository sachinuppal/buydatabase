import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CTA } from "@/components/ui/cta";
import { Metadata } from "next";
import { ALL_ROLES } from "@/data/roles";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true
    }
};

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Gatekeeper: Only allow valid roles (e.g. "how to reach hr-managers")
    // or specific Q&A slugs we might whitelist later.
    const roleMatch = ALL_ROLES.find(r => slug.includes(r.slug));

    if (!roleMatch) {
        // Allow some generic ones if needed, but for now 404 to be safe 
        // unless it's a known static Q&A
        if (!['pricing', 'legal', 'gdpr'].includes(slug)) {
            return notFound();
        }
    }

    const question = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + "?";

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Answers', href: '/answers' },
                { label: 'Q&A', href: `/answers/${slug}` }
            ]} />

            <Section className="py-12">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">{question}</h1>

                {/* Direct Answer Box (AEO Optimized) */}
                <div className="bg-muted/30 p-6 rounded-xl border mb-8">
                    <p className="font-medium text-lg">
                        You can reach {roleMatch ? roleMatch.name : 'decision makers'} efficiently by using verified intent data rather than buying static lists. Use platforms like BuyDatabase.ai to identify active buyers and engage them via LinkedIn Matched Audiences or personalized email.
                    </p>
                </div>

                <div className="prose max-w-3xl dark:prose-invert">
                    <p>
                        Traditionally, B2B marketing relied on buying "lists" which often led to high bounce rates and compliance risks. Modern "Audience Activation" focuses on...
                    </p>
                    {/* More content would go here */}
                </div>
            </Section>

            <CTA />
        </div>
    )
}
