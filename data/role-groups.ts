
export const ROLE_GROUPS = {
    'hr-and-talent': {
        title: "HR & Talent Acquisition",
        description: "Reach the people leaders building tomorrow's teams.",
        intent: "practitioner",
        primaryKeyword: "HR email list",
        secondaryKeywords: ["Talent acquisition contacts", "People operations database"],
        roles: ['hr-managers', 'talent-acquisition', 'people-ops', 'learning-development']
    },
    'technology-leaders': {
        title: "Technology Leaders (CTO/VP)",
        description: "Target decision makers for software, infrastructure, and security.",
        intent: "executive",
        primaryKeyword: "CTO email list",
        secondaryKeywords: ["VP Engineering contacts", "IT decision makers", "Tech stack data"],
        roles: ['technology-leaders-cto', 'engineering-managers', 'it-infra-admin', 'data-analytics']
    },
    'finance-leaders': {
        title: "Finance Leaders (CFO)",
        description: "Connect with the guardians of the budget and financial strategy.",
        intent: "executive",
        primaryKeyword: "CFO contact list",
        secondaryKeywords: ["Finance director emails", "Chief Financial Officer database"],
        roles: ['finance-leaders-cfo', 'accountants-cas', 'procurement-supply-chain']
    },
    'marketing-leaders': {
        title: "Marketing Leaders (CMO)",
        description: "Engage the creative and strategic minds driving brand growth.",
        intent: "executive",
        primaryKeyword: "CMO email database",
        secondaryKeywords: ["Marketing director contacts", "Digital marketing leads"],
        roles: ['marketing-leaders', 'performance-marketing', 'demand-generation', 'brand-communications']
    },
    'sales-leaders': {
        title: "Sales Leaders",
        description: "Pitch to the revenue drivers and commercial heads.",
        intent: "commercial",
        primaryKeyword: "Sales director leads",
        secondaryKeywords: ["VP Sales contacts", "Business development emails"],
        roles: ['sales-leaders', 'business-development', 'account-executives', 'inside-sales-sdr']
    },
    'cxo': {
        title: "Founders & CXOs",
        description: "Go straight to the top. Connect with business owners and C-level execs.",
        intent: "executive",
        primaryKeyword: "CEO email list",
        secondaryKeywords: ["Founder contacts", "C-suite database", "Decision maker lists"],
        roles: ['founders', 'ceo', 'cxo', 'directors']
    }
} as const;

export type RoleGroupSlug = keyof typeof ROLE_GROUPS;
