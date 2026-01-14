
import { INDUSTRIES } from './industries';
import { CORE_ROLES, EXTENDED_ROLES } from './roles';
import { TIER_1_CITIES } from './locations';

export interface Dataset {
    slug: string;
    name: string;
    description: string;
    region: 'India' | 'Global' | 'USA' | 'UK' | 'APAC' | 'EMEA' | 'Gulf' | 'Australia' | 'Canada' | 'Europe';
    type: 'B2B' | 'Industry' | 'Role' | 'Intent' | 'Niche';
    price?: string;
    recordCount?: string;
}

export const DATASETS: Dataset[] = [
    // INDIA – CORE B2B DATASETS
    {
        slug: 'india-b2b-professionals',
        name: 'India B2B Professionals',
        description: 'The complete master database of verified B2B contacts across all industries in India. Ideal for broad coverage campaigns.',
        region: 'India',
        type: 'B2B',
        recordCount: '12M+'
    },
    {
        slug: 'india-senior-decision-makers',
        name: 'India Senior Decision Makers',
        description: 'A curated list of high-authority decision makers including CXOs, VPs, and Directors who control budgets.',
        region: 'India',
        type: 'B2B',
        recordCount: '850K+'
    },
    {
        slug: 'india-it-decision-makers',
        name: 'India IT Decision Makers',
        description: 'Direct contact information for Technology buyers, CTOs, and IT leaders in Indian enterprises.',
        region: 'India',
        type: 'B2B',
        recordCount: '120K+'
    },
    {
        slug: 'india-hr-and-talent-leaders',
        name: 'India HR & Talent Leaders',
        description: 'Connect with CHROs, HR Directors, and Talent Acquisition heads actively hiring in the Indian market.',
        region: 'India',
        type: 'Role',
        recordCount: '45K+'
    },
    {
        slug: 'india-sales-and-growth-leaders',
        name: 'India Sales & Growth Leaders',
        description: 'Reach Sales Heads, CROs, and Business Development leaders who drive revenue and adopt new tech.',
        region: 'India',
        type: 'Role',
        recordCount: '60K+'
    },
    {
        slug: 'india-founders-and-cofounders',
        name: 'India Founders & Co-founders',
        description: 'Verified direct emails for startup founders and SME business owners across Tier 1 and Tier 2 cities.',
        region: 'India',
        type: 'Role',
        recordCount: '200K+'
    },
    {
        slug: 'india-startup-operators',
        name: 'India Startup Operators',
        description: 'Target early employees and key operators in high-growth funded startups (Series A+).',
        region: 'India',
        type: 'Role',
        recordCount: '35K+'
    },
    {
        slug: 'india-saas-professionals',
        name: 'India SaaS Professionals',
        description: 'Niche database of professionals working specifically in the booming Indian SaaS ecosystem.',
        region: 'India',
        type: 'B2B',
        recordCount: '80K+'
    },
    {
        slug: 'india-finance-and-accounting-leaders',
        name: 'India Finance & Accounting Leaders',
        description: 'Detailed contacts for CFOs, Finance Controllers, and Heads of Accounts in established firms.',
        region: 'India',
        type: 'Role',
        recordCount: '25K+'
    },
    {
        slug: 'india-procurement-and-supply-chain-heads',
        name: 'India Procurement & Supply Chain',
        description: 'Decision makers responsible for sourcing, logistics, and supply chain management.',
        region: 'India',
        type: 'Role',
        recordCount: '18K+'
    },

    // GLOBAL / EXPORT-READY
    { slug: 'global-b2b-decision-makers', name: 'Global B2B Decision Makers', description: 'International business leaders for export-oriented campaigns targeting US, UK, and EU.', region: 'Global', type: 'B2B', recordCount: '45M+' },
    { slug: 'apac-enterprise-leaders', name: 'APAC Enterprise Leaders', description: 'Senior management in key Asian Pacific markets including Singapore, Australia, and Japan.', region: 'APAC', type: 'B2B', recordCount: '5M+' },
    { slug: 'usa-saas-founders-and-executives', name: 'USA SaaS Founders & Executives', description: 'Direct access to tech leaders and founders in the United States startup ecosystem.', region: 'USA', type: 'Role', recordCount: '150K+' },
    { slug: 'europe-b2b-decision-makers', name: 'Europe B2B Decision Makers', description: 'Comprehensive database of business leaders across UK, Germany, France, Netherlands, and Nordics.', region: 'Europe', type: 'B2B', recordCount: '8M+' },

    // INDUSTRY SPECIFIC
    { slug: 'real-estate-industry-professionals-india', name: 'Real Estate Professionals India', description: 'Builders, brokers, consultants, and developers in the Indian property market.', region: 'India', type: 'Industry', recordCount: '300K+' },
    { slug: 'healthcare-and-hospital-administrators-india', name: 'Healthcare & Hospital Admins', description: 'Doctors, clinic owners, and hospital administrators across India.', region: 'India', type: 'Industry', recordCount: '110K+' },

    // INTENT
    { slug: 'high-growth-companies-india', name: 'High Growth Companies India', description: 'Companies demonstrating >20% YoY growth. High propensity to buy services.', region: 'India', type: 'Intent', recordCount: '12K Companies' },
    { slug: 'hiring-active-companies-india', name: 'Hiring Active Companies India', description: 'Companies with open roles for key positions in the last 30 days.', region: 'India', type: 'Intent', recordCount: '8K Companies' },
    { slug: 'technology-adoption-ready-businesses-india', name: 'Tech Adoption Ready Businesses', description: 'Traditional businesses currently digitizing operations and cloud infrastructure.', region: 'India', type: 'Intent', recordCount: '50K+' },

    // NICHE
    { slug: 'd2c-brand-founders-india', name: 'D2C Brand Founders India', description: 'Founders of direct-to-consumer internet brands selling on Shopify/WooCommerce.', region: 'India', type: 'Niche', recordCount: '15K+' },
    { slug: 'linkedin-active-professionals-india', name: 'LinkedIn Active Professionals', description: 'Professionals who posted on LinkedIn in the last 30 days. Highly responsive.', region: 'India', type: 'Niche', recordCount: '250K+' },
];

export function getDatasetBySlug(slug: string): Dataset | undefined {
    return DATASETS.find(d => d.slug === slug);
}
