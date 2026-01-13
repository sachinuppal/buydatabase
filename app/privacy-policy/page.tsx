
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Privacy Policy | BuyDatabase.ai",
    description: "Read BuyDatabase.ai’s privacy policy covering data collection, usage, protection, user rights, and compliance with global privacy regulations.",
};

export default function PrivacyPolicyPage() {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What personal data does BuyDatabase.ai collect?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "BuyDatabase.ai collects basic account information, usage data, and communication details necessary to provide and improve services."
                }
            },
            {
                "@type": "Question",
                "name": "Is my data sold to third parties?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. BuyDatabase.ai does not sell personal information for consumer advertising purposes."
                }
            },
            {
                "@type": "Question",
                "name": "How can I request data deletion?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can request access, correction, or deletion by emailing privacy@buydatabase.ai."
                }
            },
            {
                "@type": "Question",
                "name": "Is BuyDatabase.ai GDPR compliant?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "BuyDatabase.ai aligns its processes with GDPR principles including lawful processing, minimization, transparency, and user rights."
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
                { label: 'Privacy Policy', href: '/privacy-policy' }
            ]} />

            <Hero
                heading="Privacy Policy"
                subheading={`Last updated: ${formattedDate}`}
                align="left"
            />

            <Section className="py-8">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">

                    {/* 1. Introduction */}
                    <div className="mb-12">
                        <h2>1. Introduction</h2>
                        <p>
                            BuyDatabase.ai (“we”, “our”, “us”) respects your privacy and is committed to protecting it.
                        </p>
                        <p>This Privacy Policy explains:</p>
                        <ul>
                            <li>What information we collect</li>
                            <li>How we use it</li>
                            <li>How we protect it</li>
                            <li>Your rights and choices</li>
                        </ul>
                        <p>
                            This policy applies to <Link href="https://buydatabase.ai">https://buydatabase.ai</Link> and all related products, services, and communications.
                        </p>
                    </div>

                    {/* 2. Information We Collect */}
                    <div className="mb-12">
                        <h2>2. Information We Collect</h2>
                        <h3>2.1 Information You Provide</h3>
                        <ul>
                            <li>Name, email, company name</li>
                            <li>Account and billing details</li>
                            <li>Support inquiries and communications</li>
                        </ul>
                        <h3>2.2 Automatically Collected Information</h3>
                        <ul>
                            <li>IP address</li>
                            <li>Browser and device type</li>
                            <li>Usage patterns and interactions</li>
                            <li>Referral and session data</li>
                        </ul>
                        <h3>2.3 Dataset-Related Information</h3>
                        <p>
                            BuyDatabase.ai provides <strong>aggregated audience intelligence</strong>. We do not claim ownership of personal data contained in third-party sources.
                        </p>
                    </div>

                    {/* 3. How We Use Information */}
                    <div className="mb-12">
                        <h2>3. How We Use Information</h2>
                        <p>We use information to:</p>
                        <ul>
                            <li>Provide and improve our services</li>
                            <li>Respond to inquiries and requests</li>
                            <li>Manage accounts and billing</li>
                            <li>Analyze usage and performance</li>
                            <li>Ensure security and compliance</li>
                        </ul>
                        <p>
                            We do <strong>not</strong> sell personal information to third parties for consumer advertising.
                        </p>
                    </div>

                    {/* 4. Legal Basis for Processing */}
                    <div className="mb-12">
                        <h2>4. Legal Basis for Processing</h2>
                        <p>Depending on jurisdiction, processing is based on:</p>
                        <ul>
                            <li>Legitimate interest</li>
                            <li>Contractual necessity</li>
                            <li>Legal obligations</li>
                            <li>User consent (where applicable)</li>
                        </ul>
                    </div>

                    {/* 5. Data Sharing */}
                    <div className="mb-12">
                        <h2>5. Data Sharing</h2>
                        <p>We may share information with:</p>
                        <ul>
                            <li>Trusted service providers (hosting, analytics, payments)</li>
                            <li>Legal or regulatory authorities when required</li>
                            <li>Partners under strict contractual safeguards</li>
                        </ul>
                        <p>We never authorize misuse of data.</p>
                    </div>

                    {/* 6. Data Retention */}
                    <div className="mb-12">
                        <h2>6. Data Retention</h2>
                        <p>Data is retained only as long as necessary for:</p>
                        <ul>
                            <li>Business operations</li>
                            <li>Legal and compliance requirements</li>
                            <li>Legitimate operational needs</li>
                        </ul>
                    </div>

                    {/* 7. Your Rights */}
                    <div className="mb-12">
                        <h2>7. Your Rights</h2>
                        <p>Depending on your jurisdiction, you may have the right to:</p>
                        <ul>
                            <li>Access your data</li>
                            <li>Request correction or deletion</li>
                            <li>Object to certain processing</li>
                            <li>Withdraw consent</li>
                            <li>Lodge a complaint with authorities</li>
                        </ul>
                        <p>
                            Requests can be sent to: <a href="mailto:privacy@buydatabase.ai" className="text-primary font-medium">privacy@buydatabase.ai</a>
                        </p>
                    </div>

                    {/* 8. Security Measures */}
                    <div className="mb-12">
                        <h2>8. Security Measures</h2>
                        <p>We implement:</p>
                        <ul>
                            <li>Access controls</li>
                            <li>Encryption where appropriate</li>
                            <li>Monitoring and audit practices</li>
                            <li>Vendor due diligence</li>
                        </ul>
                        <p>No system is 100% secure, but we continuously improve safeguards.</p>
                    </div>

                    {/* 9. International Transfers */}
                    <div className="mb-12">
                        <h2>9. International Transfers</h2>
                        <p>
                            Data may be processed across regions. Appropriate safeguards are applied to ensure lawful transfer.
                        </p>
                    </div>

                    {/* 10. Updates to This Policy */}
                    <div className="mb-12">
                        <h2>10. Updates to This Policy</h2>
                        <p>
                            This policy may be updated periodically. Changes will be reflected on this page with a revised date.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="mb-12 bg-muted/20 p-6 rounded-lg border">
                        <h2 className="mt-0">Contact</h2>
                        <p className="mb-0">
                            For privacy questions: <a href="mailto:privacy@buydatabase.ai" className="text-primary font-medium">privacy@buydatabase.ai</a>
                        </p>
                    </div>

                </div>
            </Section>
        </div>
    )
}
