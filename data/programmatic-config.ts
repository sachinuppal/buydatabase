
import { TIER_1_CITIES } from './locations';
import { CORE_ROLES } from './roles';

// Whitelist for Phase 1: 8 Cities x 10 Roles = 80 Pages
const PHASE_1_CITIES = TIER_1_CITIES.map(c => c.slug);
const PHASE_1_ROLES = CORE_ROLES.map(r => r.slug);

export const PROGRAMMATIC_CONFIG = {
    audiences: {
        combos: {
            whitelistedCities: PHASE_1_CITIES,
            whitelistedRoles: PHASE_1_ROLES,
        }
    }
};

export function getAllComboSlugs() {
    const combos: { country: string; city: string; role: string }[] = [];

    // Hardcoded to India for Phase 1 as per requirements
    const country = 'india';

    for (const city of PHASE_1_CITIES) {
        for (const role of PHASE_1_ROLES) {
            combos.push({ country, city, role });
        }
    }
    return combos;
}

export function isValidCombo(city: string, role: string) {
    return (PHASE_1_CITIES as string[]).includes(city) && (PHASE_1_ROLES as string[]).includes(role);
}
