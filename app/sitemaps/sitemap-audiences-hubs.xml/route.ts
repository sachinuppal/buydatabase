
import { TIER_1_CITIES, TIER_2_CITIES, COUNTRIES } from '@/data/locations';
import { CORE_ROLES, EXTENDED_ROLES } from '@/data/roles';

export async function GET() {
    const baseUrl = 'https://buydatabase.ai';

    // Hubs
    const hubs = [
        ...COUNTRIES.map(c => `/audiences/${c.slug}`),
        ...TIER_1_CITIES.map(c => `/audiences/india/${c.slug}`),
        ...TIER_2_CITIES.map(c => `/audiences/india/${c.slug}`),
        ...CORE_ROLES.map(r => `/audiences/by-role/${r.slug}`),
        ...EXTENDED_ROLES.map(r => `/audiences/by-role/${r.slug}`),
        '/audiences/by-location',
        '/audiences/by-role'
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${hubs.map(path => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}
</urlset>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
