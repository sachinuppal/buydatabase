
export interface NavItem {
    label: string;
    href: string;
}

export interface MegaMenuItem {
    label: string;
    href: string; // The parent link (e.g., /audiences)
    columns?: {
        title?: string;
        items: NavItem[];
    }[];
}

export const MAIN_NAV: MegaMenuItem[] = [
    {
        label: 'Audiences',
        href: '/audiences',
        columns: [
            {
                title: 'By Location',
                items: [
                    { label: 'India Audiences', href: '/audiences/india' },
                    { label: 'USA Audiences', href: '/audiences/usa' },
                    { label: 'UAE Audiences', href: '/audiences/uae' },
                    { label: 'Europe Audiences', href: '/audiences/europe' },
                    { label: 'Bangalore', href: '/audiences/india/bangalore' },
                    { label: 'Mumbai', href: '/audiences/india/mumbai' },
                    { label: 'Delhi NCR', href: '/audiences/india/delhi' },
                ]
            },
            {
                title: 'By Role',
                items: [
                    { label: 'Founders & CXOs', href: '/audiences/by-role/cxo' },
                    { label: 'Marketing Leaders', href: '/audiences/by-role/marketing-leaders' },
                    { label: 'Sales Leaders', href: '/audiences/by-role/sales-leaders' },
                    { label: 'HR & Talent', href: '/audiences/by-role/hr-and-talent' },
                    { label: 'Tech Leaders', href: '/audiences/by-role/technology-leaders' },
                    { label: 'Finance Leaders', href: '/audiences/by-role/finance-leaders' },
                ]
            },
            {
                title: 'By Industry',
                items: [
                    { label: 'IT & Software', href: '/audiences/by-industry/it-software' },
                    { label: 'Healthcare', href: '/audiences/by-industry/healthcare' },
                    { label: 'Manufacturing', href: '/audiences/by-industry/manufacturing' },
                    { label: 'Real Estate', href: '/audiences/by-industry/real-estate' },
                    { label: 'Financial Services', href: '/audiences/by-industry/financial-services' },
                ]
            },
            {
                title: 'Popular Combos',
                items: [
                    { label: 'HR Managers in Bangalore', href: '/audiences/india/bangalore/hr-managers' },
                    { label: 'Founders in Mumbai', href: '/audiences/india/mumbai/founders' },
                    { label: 'Marketing Leaders in Delhi', href: '/audiences/india/delhi/marketing-leaders' },
                    { label: 'CTOs in Pune', href: '/audiences/india/pune/ctos' },
                ]
            }
        ]
    },
    {
        label: 'Datasets',
        href: '/datasets',
        columns: [
            {
                title: 'Featured Datasets',
                items: [
                    { label: 'India B2B Professionals', href: '/datasets/india-b2b-professionals' },
                    { label: 'Senior Decision Makers', href: '/datasets/india-senior-decision-makers' },
                    { label: 'HR & Talent Leaders', href: '/datasets/india-hr-and-talent-leaders' },
                    { label: 'High-Growth Companies', href: '/datasets/high-growth-companies-india' }
                ]
            },
            {
                title: 'By Country',
                items: [
                    { label: 'India', href: '/datasets/india' },
                    { label: 'USA', href: '/datasets/usa' },
                    { label: 'UAE', href: '/datasets/uae' },
                    { label: 'Europe', href: '/datasets/europe' }
                ]
            },
            {
                title: 'By Role',
                items: [
                    // Mapping these to Audience Roles for better UX as specific dataset pages for EVERY role might not exist yet
                    // OR mapping to filtered dataset view if supported. 
                    // Safe bet: Audience Role pages which have "Get Data"
                    { label: 'CXO / Founders', href: '/audiences/by-role/cxo' },
                    { label: 'Marketing', href: '/audiences/by-role/marketing' },
                    { label: 'Sales', href: '/audiences/by-role/sales' },
                    { label: 'HR', href: '/audiences/by-role/hr-and-talent' },
                    { label: 'Technology', href: '/audiences/by-role/technology' }
                ]
            },
            {
                title: 'By Industry',
                items: [
                    { label: 'IT & Software', href: '/audiences/by-industry/it-software' },
                    { label: 'Healthcare', href: '/audiences/by-industry/healthcare' },
                    { label: 'Manufacturing', href: '/audiences/by-industry/manufacturing' },
                    { label: 'Real Estate', href: '/audiences/by-industry/real-estate' }
                ]
            }
        ]
    },
    {
        label: 'Use Cases',
        href: '/use-cases',
        columns: [
            {
                items: [
                    { label: 'Outbound Prospecting', href: '/datasets/use-cases/outbound' },
                    { label: 'ABM Campaigns', href: '/datasets/use-cases/abm' },
                    { label: 'Demand Generation', href: '/datasets/use-cases/demand-generation' },
                    { label: 'Recruitment', href: '/datasets/use-cases/recruitment' },
                    { label: 'Market Research', href: '/datasets/use-cases/market-research' },
                ]
            }
        ]
    },
    {
        label: 'Resources',
        href: '/resources',
        columns: [
            {
                items: [
                    { label: 'Blog', href: '/blog' },
                    { label: 'Playbooks', href: '/playbooks' },
                    { label: 'FAQs', href: '/faq' },
                    { label: 'Activation', href: '/activation' },
                    { label: 'About Us', href: '/about' },
                ]
            }
        ]
    }
];

export const FOOTER_NAV = {
    about: {
        title: "BuyDatabase.ai",
        desc: "Audience discovery & activation platform for outbound, ABM, recruitment, and market research teams.",
        links: []
    },
    audiences: [
        { label: 'Bangalore Audiences', href: '/audiences/india/bangalore' },
        { label: 'Mumbai Audiences', href: '/audiences/india/mumbai' },
        { label: 'Delhi NCR Audiences', href: '/audiences/india/delhi' },
        { label: 'Founders & CXOs', href: '/audiences/by-role/cxo' },
        { label: 'Marketing Leaders', href: '/audiences/by-role/marketing-leaders' },
        { label: 'IT & Software', href: '/audiences/by-industry/it-software' },
    ],
    datasets: [
        { label: 'India B2B Professionals', href: '/datasets/india-b2b-professionals' },
        { label: 'Senior Decision Makers', href: '/datasets/india-senior-decision-makers' },
        { label: 'India Datasets', href: '/datasets/india' },
        { label: 'USA Datasets', href: '/datasets/usa' },
        { label: 'Outbound Campaigns', href: '/datasets/use-cases/outbound' },
    ],
    platform: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Activation Workflows', href: '/activation' },
        { label: 'Use Cases', href: '/use-cases' },
        { label: 'Pricing', href: '/pricing' },
    ],
    resources: [
        { label: 'Blog', href: '/blog' },
        { label: 'Playbooks', href: '/playbooks' },
        { label: 'Glossary', href: '/glossary' },
        { label: 'FAQs', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ],
    compliance: [
        { label: 'Data Philosophy', href: '/about/data-philosophy' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms' },
    ]
};
