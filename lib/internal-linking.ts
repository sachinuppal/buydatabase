
import { ALL_ROLES, LEADERSHIP_ROLES, MARKETING_ROLES, SALES_ROLES, HR_ROLES, TECH_ROLES, OPS_ROLES, INDUSTRY_ROLES } from '@/data/roles';
import { INDUSTRIES } from '@/data/industries';
import { TIER_1_CITIES, ALL_CITIES } from '@/data/locations';
import { DATASETS, Dataset } from '@/data/datasets';

// Grouping for easier lookup
const ROLE_CATEGORIES = [
    LEADERSHIP_ROLES,
    MARKETING_ROLES,
    SALES_ROLES,
    HR_ROLES,
    TECH_ROLES,
    OPS_ROLES,
    INDUSTRY_ROLES
];

// --- Roles ---

export function getRelatedRoles(currentSlug: string, count: number = 5) {
    // 1. Find which category this role belongs to
    const category = ROLE_CATEGORIES.find(cat => cat.some(r => r.slug === currentSlug));

    let candidates = category ? [...category] : [...ALL_ROLES];

    // Filter out current role
    candidates = candidates.filter(r => r.slug !== currentSlug);

    // Shuffle and slice (simple randomization for variety)
    const shuffled = candidates.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// --- Cities ---

export function getTopCities(count: number = 8) {
    return TIER_1_CITIES.slice(0, count);
}

export function getNearbyCities(currentCitySlug: string, count: number = 5) {
    // Ideally we'd have geolocation lat/long, but for now we fallback to other Tier 1s 
    // or just random other cities to ensure coverage.
    // Let's return other Tier 1 cities excluding current.
    return TIER_1_CITIES.filter(c => c.slug !== currentCitySlug).slice(0, count);
}

// --- Industries ---

export function getRelatedIndustries(currentSlug?: string, count: number = 5) {
    let candidates = [...INDUSTRIES];
    if (currentSlug) {
        candidates = candidates.filter(i => i.slug !== currentSlug);
    }
    return candidates.sort(() => 0.5 - Math.random()).slice(0, count);
}

// --- Datasets ---

export function getRelevantDatasets(keyword: string, count: number = 3): Dataset[] {
    if (!keyword) return [];

    const term = keyword.toLowerCase().replace(/-/g, ' ');

    // Score datasets based on match
    const scored = DATASETS.map(d => {
        let score = 0;
        const text = (d.slug + ' ' + d.name + ' ' + d.description).toLowerCase();

        if (text.includes(term)) score += 10;

        // Split keyword
        const parts = term.split(' ');
        parts.forEach(p => {
            if (p.length > 3 && text.includes(p)) score += 2;
        });

        return { dataset: d, score };
    });

    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, count)
        .map(s => s.dataset);
}

// --- Audiences (Combinations) ---
// Used to link FROM a Dataset page TO Audience pages

export function getRelatedAudiencesForDataset(datasetSlug: string): { url: string, label: string }[] {
    // Heuristic: map dataset type to audience types
    // If dataset is "India HR Leaders", link to /audiences/india/hr-managers/ etc.

    const dataset = DATASETS.find(d => d.slug === datasetSlug);
    if (!dataset) return [];

    const links: { url: string, label: string }[] = [];

    // 1. Extract potential role from slug
    const matchedRole = ALL_ROLES.find(r => dataset.slug.includes(r.slug) || dataset.description.toLowerCase().includes(r.singular.toLowerCase()));

    // 2. Extract potential location
    const isIndia = dataset.region === 'India';
    const isUSA = dataset.region === 'USA';

    if (matchedRole) {
        // Link to Role Page
        links.push({ url: `/audiences/by-role/${matchedRole.slug}`, label: `View ${matchedRole.name} Audiences` });

        // Link to Role + Top City combos (if India)
        if (isIndia) {
            TIER_1_CITIES.slice(0, 3).forEach(city => {
                links.push({
                    url: `/audiences/india/${city.slug}/${matchedRole.slug}`,
                    label: `${matchedRole.name} in ${city.name}`
                });
            });
        }
    } else {
        // Fallback: Link to top categories
        links.push({ url: '/audiences/by-role/cxo', label: 'CXO Audiences' });
        links.push({ url: '/audiences/by-role/hr-and-talent', label: 'HR Audiences' });
    }

    return links;
}
