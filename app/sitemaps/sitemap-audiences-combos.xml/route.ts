
import { getAllComboSlugs } from '@/data/programmatic-config';

export async function GET() {
    const baseUrl = 'https://buydatabase.ai';
    const combos = getAllComboSlugs();

    const urls = combos.map(c => ({
        loc: `${baseUrl}/audiences/${c.country}/${c.city}/${c.role}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
    }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
