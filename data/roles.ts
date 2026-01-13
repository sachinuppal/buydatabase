
// Leadership
export const LEADERSHIP_ROLES = [
    { slug: 'founders', name: 'Founders', singular: 'Founder' },
    { slug: 'ceo', name: 'CEOs', singular: 'CEO' },
    { slug: 'cxo', name: 'CXOs', singular: 'CXO' },
    { slug: 'directors', name: 'Directors', singular: 'Director' },
    { slug: 'vp-leaders', name: 'VPs & Leaders', singular: 'VP' },
] as const;

// Marketing & Growth
export const MARKETING_ROLES = [
    { slug: 'marketing-leaders', name: 'Marketing Leaders', singular: 'Marketing Leader' },
    { slug: 'performance-marketing', name: 'Performance Marketers', singular: 'Performance Marketer' },
    { slug: 'demand-generation', name: 'Demand Gen Managers', singular: 'Demand Gen Manager' },
    { slug: 'seo-content', name: 'SEO & Content Leads', singular: 'SEO & Content Lead' },
    { slug: 'brand-communications', name: 'Brand & Comms Heads', singular: 'Brand & Comms Head' },
    { slug: 'social-media-influencer-marketing', name: 'Social Media & Influencer Leads', singular: 'Social Media Lead' },
] as const;

// Sales & Revenue
export const SALES_ROLES = [
    { slug: 'sales-leaders', name: 'Sales Leaders', singular: 'Sales Leader' },
    { slug: 'business-development', name: 'Business Development', singular: 'Business Development' },
    { slug: 'account-executives', name: 'Account Executives', singular: 'Account Executive' },
    { slug: 'inside-sales-sdr', name: 'Inside Sales & SDRs', singular: 'Inside Sales & SDR' },
    { slug: 'revops', name: 'RevOps Leaders', singular: 'RevOps Leader' },
    { slug: 'partnerships-channel-sales', name: 'Partnerships & Cannel Heads', singular: 'Partnerships Head' },
] as const;

// HR & Talent
export const HR_ROLES = [
    { slug: 'hr-managers', name: 'HR Managers', singular: 'HR Manager' },
    { slug: 'talent-acquisition', name: 'Talent Acquisition', singular: 'Talent Acquisition' },
    { slug: 'people-ops', name: 'People Ops Leaders', singular: 'People Ops Leader' },
    { slug: 'learning-development', name: 'L&D Heads', singular: 'L&D Head' },
] as const;

// Tech & Product
export const TECH_ROLES = [
    { slug: 'technology-leaders-cto', name: 'CTOs & Tech Leaders', singular: 'CTO' },
    { slug: 'engineering-managers', name: 'Engineering Managers', singular: 'Engineering Manager' },
    { slug: 'product-managers', name: 'Product Managers', singular: 'Product Manager' },
    { slug: 'it-infra-admin', name: 'IT Infra & Admins', singular: 'IT Admin' },
    { slug: 'data-analytics', name: 'Data & Analytics', singular: 'Data Leader' },
] as const;

// Finance / Legal / Ops
export const OPS_ROLES = [
    { slug: 'finance-leaders-cfo', name: 'Finance Leaders (CFO)', singular: 'CFO' },
    { slug: 'accountants-cas', name: 'Accountants & CAs', singular: 'Accountant' },
    { slug: 'legal-compliance', name: 'Legal & Compliance', singular: 'Legal Head' },
    { slug: 'procurement-supply-chain', name: 'Procurement & Supply Chain', singular: 'Procurement Head' },
    { slug: 'operations-strategy', name: 'Operations & Strategy', singular: 'Operations Head' },
] as const;

// Industry roles
export const INDUSTRY_ROLES = [
    { slug: 'doctors-healthcare', name: 'Doctors & Healthcare', singular: 'Doctor' },
    { slug: 'teachers-education', name: 'Teachers & Education', singular: 'Teacher' },
    { slug: 'real-estate-agents', name: 'Real Estate Agents', singular: 'Real Estate Agent' },
    { slug: 'insurance-agents', name: 'Insurance Agents', singular: 'Insurance Agent' },
    { slug: 'travel-agents', name: 'Travel Agents', singular: 'Travel Agent' },
    { slug: 'architects-interior-designers', name: 'Architects & Interior Designers', singular: 'Architect' },
] as const;

export const ALL_ROLES = [
    ...LEADERSHIP_ROLES,
    ...MARKETING_ROLES,
    ...SALES_ROLES,
    ...HR_ROLES,
    ...TECH_ROLES,
    ...OPS_ROLES,
    ...INDUSTRY_ROLES,
] as const;

// Aliases for Backward Compatibility
export const CORE_ROLES = [
    ...LEADERSHIP_ROLES.slice(0, 5),
    ...HR_ROLES.slice(0, 2),
    ...SALES_ROLES.slice(0, 2),
] as const;

export const EXTENDED_ROLES = [
    ...MARKETING_ROLES,
    ...TECH_ROLES,
    ...OPS_ROLES
] as const;

// Content Templates with Generic Fallback
const LEADERSHIP_CONTENT = {
    whoAreThey: [
        "Primary visionaries and strategic decision-makers",
        "Final approvers for high-ticket investments",
        "Focused on company-wide growth, valuation, and market position",
        "Heavily involved in partnerships and investor relations"
    ],
    whyTheyMatter: [
        "Owners of the budget and ultimate authority",
        "Always looking for competitive advantages and efficiency",
        "High churn in tools that don't demonstrate clear ROI"
    ],
    challenges: [
        "Sustaining growth in competitive markets",
        "Hiring and retaining top-tier talent",
        "Managing cash flow and fundraising",
        "Operational scaling without breaking culture"
    ],
    useCases: [
        { title: "Strategic Partnerships", desc: "Proposals for joint ventures, M&A, or strategic alliances." },
        { title: "High-Ticket SaaS", desc: "Enterprise software that solves fundamental business problems." },
        { title: "Investment Opportunities", desc: "Deal flow and capital raising outreach." }
    ]
};

const MARKETING_CONTENT = {
    whoAreThey: [
        "Leaders responsible for brand, demand, and growth",
        "Managers of large ad budgets and martech stacks",
        "Data-driven decision makers focused on CAC and LTV",
        "Key influencers for sales and revenue tools"
    ],
    whyTheyMatter: [
        "Control significant discretionary budget",
        "Constantly evaluating new channels and tools",
        "High intent for solutions that drive leads or awareness"
    ],
    challenges: [
        "Rising ad costs and platform saturation",
        "Attributing revenue to specific channels (Attribution)",
        "Scaling content production quality and velocity",
        "Aligning with sales teams on lead quality"
    ],
    useCases: [
        { title: "MarTech Solutions", desc: "Tools for automation, analytics, and personalization." },
        { title: "Agency Services", desc: "Outsourced performance marketing or creative services." },
        { title: "Media Buying", desc: "Direct placement or sponsorship opportunities." }
    ]
};

export const ROLE_CONTENT_TEMPLATES: Record<string, {
    whoAreThey: string[];
    whyTheyMatter: string[];
    challenges: string[];
    useCases: { title: string; desc: string }[];
}> = {
    'founders': LEADERSHIP_CONTENT,
    'ceo': { ...LEADERSHIP_CONTENT, whoAreThey: ["Chief Executives driving overall strategy", "The face of the company to the market", "Final decision maker for all major initiatives"] },
    'cxo': { ...LEADERSHIP_CONTENT, whoAreThey: ["C-Suite executives (COO, CIO, CPO)", "Departmental heads with board-level influence", "Strategic operators"] },

    'marketing-leaders': MARKETING_CONTENT,
    'performance-marketing': {
        ...MARKETING_CONTENT,
        whoAreThey: ["Specialists in paid acquisition (Meta, Google, LinkedIn)", "Growth hackers focused on ROAS", "Technical marketers"],
        challenges: ["Signal loss from privacy changes (iOS14+)", "Creative fatigue", "Rising CPMs"]
    },
    'demand-generation': {
        ...MARKETING_CONTENT,
        whoAreThey: ["B2B marketers focused on pipeline velocity", "Lead generation experts", "ABM strategists"],
        useCases: [
            { title: "Lead Gen Services", desc: "Databases, enrichment, and cold outreach tools." },
            { title: "ABM Platforms", desc: "Orchestration tools for target account engagement." },
            { title: "Event Sponsorship", desc: "Webinars and virtual summits." }
        ]
    },

    // --- SALES ---
    'sales-leaders': {
        whoAreThey: ["VPs of Sales and CROs", "Managers of SDR/AE teams", "Revenue architects"],
        whyTheyMatter: ["Responsible for top-line revenue targets", "High budget for enablement and data", "Aggressive adopters of efficiency tools"],
        challenges: ["Hitting quota consistency", "Ramping up new reps quickly", "Pipeline accuracy and forecasting", "Lead quality issues"],
        useCases: [
            { title: "Sales Intelligence", desc: "Data providers and enrichment tools." },
            { title: "Sales Engagement", desc: "Outreach sequencing and dialer software." },
            { title: "Coaching & Training", desc: "Methodology training (Sandler, MEDDIC)." }
        ]
    },
    'business-development': {
        whoAreThey: ["Heads of Partnerships", "Strategic Alliance Managers", "Channel Sales Directors"],
        whyTheyMatter: ["Open doors to new markets", "Handle complex, high-value negotiations", "Key to indirect revenue channels"],
        challenges: ["Finding the right partners", "Aligning incentives", "Tracking partner-influenced revenue"],
        useCases: [
            { title: "Partner PRM", desc: "Partner Relationship Management software." },
            { title: "Co-Marketing", desc: "Joint webinar and content initiatives." },
            { title: "Affiliate Networks", desc: "Tools to manage referral commissions." }
        ]
    },

    // --- HR ---
    'hr-managers': {
        whoAreThey: ["People Operations Managers", "HR Directors", "Culture champions"],
        whyTheyMatter: ["Gatekeepers of employee experience", "Manage benefits, payroll, and compliance", "Influence company culture purchasing"],
        challenges: ["Employee retention and engagement", "Compliance with changing labor laws", "Managing remote/hybrid culture"],
        useCases: [
            { title: "HRIS & Payroll", desc: "Core employee management systems." },
            { title: "Benefits & Perks", desc: "Health insurance, wellness programs, and rewards." },
            { title: "Employee Engagement", desc: "Surveys and feedback tools." }
        ]
    },
    'talent-acquisition': {
        whoAreThey: ["Recruiters and Headhunters", "Talent Sourcing Leads", "Employer Branding Managers"],
        whyTheyMatter: ["Own the hiring budget", "Constant need for candidate data", "Power users of LinkedIn and job boards"],
        challenges: ["Time-to-fill open roles", "Quality of candidates", "Ghosting by candidates", "Diversity hiring targets"],
        useCases: [
            { title: "Recruitment Tools", desc: "ATS and candidate sourcing platforms." },
            { title: "Job Boards", desc: "Premium listings and slots." },
            { title: "Agency Support", desc: "External RPO or contingency recruiting." }
        ]
    },

    // --- TECH ---
    'technology-leaders-cto': {
        whoAreThey: ["Chief Technology Officers", "VP Engineering", "Technical Co-founders"],
        whyTheyMatter: ["Make final decisions on tech stack", "Manage large engineering salaries", "Responsible for security and scale"],
        challenges: ["Technical debt", "Hiring senior engineers", "Security and compliance audits", "Vendor lock-in"],
        useCases: [
            { title: "Cloud Infrastructure", desc: "AWS/GCP/Azure optimization services." },
            { title: "DevTools", desc: "CI/CD, monitoring, and productivity tools." },
            { title: "Cybersecurity", desc: "Pen-testing and compliance audits." }
        ]
    },
    'product-managers': {
        whoAreThey: ["Heads of Product", "Senior PMs", "Product Owners"],
        whyTheyMatter: ["Prioritize the roadmap", "Influence design and engineering resources", "Deeply understand user needs"],
        challenges: ["Prioritizing features vs. bugs", "Aligning stakeholders", "Finding product-market fit"],
        useCases: [
            { title: "Product Analytics", desc: "Amplitude, Mixpanel, etc." },
            { title: "User Research", desc: "Survey tools and interview platforms." },
            { title: "Roadmapping", desc: "Jira, Linear, and planning software." }
        ]
    }
};

export function getRoleContent(roleSlug: string) {
    if (ROLE_CONTENT_TEMPLATES[roleSlug]) {
        return ROLE_CONTENT_TEMPLATES[roleSlug];
    }

    return {
        whoAreThey: [
            "Decision makers within their functional area",
            "Key influencers for new tool adoption",
            "Budget stakeholders for departmental vendors",
            "Team leaders driving operational strategy",
            "Professionals focused on efficiency and growth"
        ],
        whyTheyMatter: [
            "Control or influence budget allocation",
            "High intent for solutions that solve specific pain points",
            "Often the primary user or champion of new software"
        ],
        challenges: [
            "Meeting aggressive targets with limited resources",
            "Keeping up with rapidly changing market trends",
            "Managing team productivity and retention",
            "Finding reliable vendors and partners",
            "Demonstrating ROI to leadership"
        ],
        useCases: [
            { title: "Direct Outreach", desc: "Cold email and LinkedIn messages pitching relevant solutions." },
            { title: "Account-Based Marketing", desc: "Targeted ads and content tailored to their specific role." },
            { title: "Partnership Opportunities", desc: "Collaboration proposals for mutual growth." }
        ]
    };
}
