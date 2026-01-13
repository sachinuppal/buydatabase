
export function GlobalSchema() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://buydatabase.ai/#organization",
        "name": "BuyDatabase.ai",
        "url": "https://buydatabase.ai",
        "logo": "https://buydatabase.ai/assets/logo.png",
        "description": "BuyDatabase.ai is a privacy-conscious audience intelligence platform that helps businesses discover, segment, and activate high-quality datasets for research, outreach, and go-to-market planning.",
        "foundingDate": "2025",
        "industry": "Audience Intelligence, Data Platforms, Marketing Technology",
        "sameAs": [
            "https://www.linkedin.com/company/buydatabase-ai",
            "https://twitter.com/buydatabaseai"
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@buydatabase.ai",
                "availableLanguage": ["English"]
            },
            {
                "@type": "ContactPoint",
                "contactType": "privacy",
                "email": "privacy@buydatabase.ai",
                "availableLanguage": ["English"]
            },
            {
                "@type": "ContactPoint",
                "contactType": "compliance",
                "email": "compliance@buydatabase.ai",
                "availableLanguage": ["English"]
            }
        ],
        "knowsAbout": [
            "Audience segmentation",
            "B2B data intelligence",
            "Market research",
            "Go-to-market strategy",
            "Privacy-first data practices",
            "GDPR compliance",
            "India DPDP Act"
        ]
    };

    const trustActionSchema = {
        "@context": "https://schema.org",
        "@type": "TrustAction",
        "@id": "https://buydatabase.ai/#trust-action",
        "agent": {
            "@type": "Organization",
            "@id": "https://buydatabase.ai/#organization"
        },
        "object": {
            "@type": "CreativeWork",
            "name": "BuyDatabase.ai Data Practices"
        },
        "description": "BuyDatabase.ai commits to ethical data sourcing, privacy-first audience intelligence, regulatory alignment, and responsible customer usage.",
        "result": [
            {
                "@type": "Thing",
                "name": "Privacy-first data processing"
            },
            {
                "@type": "Thing",
                "name": "Regulatory-aligned data usage"
            },
            {
                "@type": "Thing",
                "name": "Transparent customer guidelines"
            },
            {
                "@type": "Thing",
                "name": "Protection against misuse"
            }
        ],
        "potentialAction": {
            "@type": "Action",
            "name": "Review Data Use Guidelines",
            "target": "https://buydatabase.ai/about/data-use-guidelines/"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(trustActionSchema) }}
            />
        </>
    );
}
