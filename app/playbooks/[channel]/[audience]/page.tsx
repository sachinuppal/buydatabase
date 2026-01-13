import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CTA } from "@/components/ui/cta";
import { ALL_ROLES } from "@/data/roles";
import { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true
    }
};

export default async function PlaybookPage({ params }: { params: Promise<{ channel: string; audience: string }> }) {
    const { channel, audience } = await params;

    // 1. Validator: Channel
    if (channel !== 'email' && channel !== 'linkedin') return notFound();

    // 2. Validator: Audience (Must be a valid Role)
    const validRole = ALL_ROLES.find(r => r.slug === audience);
    if (!validRole) return notFound();

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumbs items={[
                { label: 'Playbooks', href: '/playbooks' },
                { label: channel, href: `/playbooks/${channel}` },
                { label: audience, href: `/playbooks/${channel}/${audience}` }
            ]} />

            <Hero
                heading={`How to target ${validRole.name} via ${channel === 'email' ? 'Email' : 'LinkedIn'}`}
                subheading="A comprehensive guide including messaging templates and channel setup."
            />

            <Section>
                <div className="prose max-w-3xl mx-auto dark:prose-invert">
                    <p className="lead">
                        Successfully activating {validRole.name} requires a nuanced approach. This playbook breaks down the exact steps to launch a {channel} campaign.
                    </p>
                    <h2>1. Audience Definition</h2>
                    <p>Understanding the pain points of this segment is crucial...</p>

                    <h2>2. Messaging Framework</h2>
                    <p>Avoid generic pitches. Instead focus on value...</p>

                    <h3>Subject Line Examples</h3>
                    <ul>
                        <li>Idea for [Company]...</li>
                        <li>Quick question re: [Topic]...</li>
                    </ul>

                    <h2>3. Activation Stats</h2>
                    <p>Expected open rates: 45-60%<br />Expected reply rates: 8-12%</p>
                </div>
            </Section>

            <CTA title="Get the Data for This Playbook" />
        </div>
    )
}
