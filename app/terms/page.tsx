
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Terms of Service | BuyDatabase.ai",
    description: "Read BuyDatabase.ai’s terms of service governing platform usage, data access, responsibilities, limitations, and legal conditions.",
};

export default function TermsPage() {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What can I use BuyDatabase.ai data for?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You may use BuyDatabase.ai services for lawful business purposes such as research, outreach, recruitment, and planning."
                }
            },
            {
                "@type": "Question",
                "name": "Is resale of data allowed?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Resale or redistribution of data without authorization is prohibited."
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumbs items={[
                { label: 'Terms of Service', href: '/terms' }
            ]} />

            <Hero
                heading="Terms of Service"
                subheading={`Last updated: ${formattedDate}`}
                align="left"
            />

            <Section className="py-8">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">

                    {/* 1. Acceptance */}
                    <div className="mb-12">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using BuyDatabase.ai, you agree to these Terms of Service. If you do not agree, you must discontinue use.
                        </p>
                    </div>

                    {/* 2. Description of Services */}
                    <div className="mb-12">
                        <h2>2. Description of Services</h2>
                        <p>BuyDatabase.ai provides:</p>
                        <ul>
                            <li>Audience intelligence</li>
                            <li>Dataset discovery</li>
                            <li>Segmentation tools</li>
                            <li>Campaign support and insights</li>
                        </ul>
                        <p>We do not guarantee specific campaign outcomes.</p>
                    </div>

                    {/* 3. User Responsibilities */}
                    <div className="mb-12">
                        <h2>3. User Responsibilities</h2>
                        <p>You agree to:</p>
                        <ul>
                            <li>Use the platform lawfully</li>
                            <li>Respect privacy and data regulations</li>
                            <li>Avoid spam, harassment, or deception</li>
                            <li>Comply with applicable laws (GDPR, DPDP, CCPA, etc.)</li>
                        </ul>
                        <p>You are solely responsible for how you use insights or datasets.</p>
                    </div>

                    {/* 4. Prohibited Uses */}
                    <div className="mb-12">
                        <h2>4. Prohibited Uses</h2>
                        <p>You may not:</p>
                        <ul>
                            <li>Use data for illegal or unethical activities</li>
                            <li>Attempt to re-identify individuals</li>
                            <li>Resell data without authorization</li>
                            <li>Scrape or abuse platform infrastructure</li>
                            <li>Misrepresent BuyDatabase.ai as a data owner</li>
                        </ul>
                    </div>

                    {/* 5. Intellectual Property */}
                    <div className="mb-12">
                        <h2>5. Intellectual Property</h2>
                        <p>
                            All platform content, branding, and structure are owned by BuyDatabase.ai. You receive a <strong>limited, non-transferable license</strong> to use services as intended.
                        </p>
                    </div>

                    {/* 6. Payments & Access */}
                    <div className="mb-12">
                        <h2>6. Payments & Access</h2>
                        <ul>
                            <li>Pricing, access levels, and usage limits may vary</li>
                            <li>Non-payment may result in suspension</li>
                            <li>Refunds are governed by stated policies</li>
                        </ul>
                    </div>

                    {/* 7. Disclaimers */}
                    <div className="mb-12">
                        <h2>7. Disclaimers</h2>
                        <p>Services are provided “as is.” We disclaim:</p>
                        <ul>
                            <li>Guarantees of accuracy or completeness</li>
                            <li>Guarantees of conversion or ROI</li>
                            <li>Liability for third-party misuse</li>
                        </ul>
                    </div>

                    {/* 8. Limitation of Liability */}
                    <div className="mb-12">
                        <h2>8. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, BuyDatabase.ai is not liable for:
                        </p>
                        <ul>
                            <li>Indirect or consequential damages</li>
                            <li>Loss of profits or data</li>
                            <li>Misuse of information by users</li>
                        </ul>
                    </div>

                    {/* 9. Indemnification */}
                    <div className="mb-12">
                        <h2>9. Indemnification</h2>
                        <p>You agree to indemnify BuyDatabase.ai against claims arising from:</p>
                        <ul>
                            <li>Your misuse of data</li>
                            <li>Violation of laws or rights</li>
                            <li>Breach of these terms</li>
                        </ul>
                    </div>

                    {/* 10. Governing Law */}
                    <div className="mb-12">
                        <h2>10. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of <strong>India</strong>, unless otherwise required by applicable regulations.
                        </p>
                    </div>

                    {/* 11. Changes to Terms */}
                    <div className="mb-12">
                        <h2>11. Changes to Terms</h2>
                        <p>We may update these terms periodically. Continued use constitutes acceptance.</p>
                    </div>

                    {/* Contact */}
                    <div className="mb-12 bg-muted/20 p-6 rounded-lg border">
                        <h2 className="mt-0">Contact</h2>
                        <p className="mb-0">
                            For legal inquiries: <a href="mailto:legal@buydatabase.ai" className="text-primary font-medium">legal@buydatabase.ai</a>
                        </p>
                    </div>

                </div>
            </Section>
        </div>
    )
}
