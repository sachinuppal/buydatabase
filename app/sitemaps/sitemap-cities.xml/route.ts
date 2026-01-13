
import { ALL_CITIES } from '@/data/locations';

export async function GET() {
    const baseUrl = 'https://buydatabase.ai';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${ALL_CITIES.map(city => `
    <url>
      <loc>${baseUrl}/audiences/by-location/${city.country.toLowerCase()}/${city.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('')}
</urlset>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
