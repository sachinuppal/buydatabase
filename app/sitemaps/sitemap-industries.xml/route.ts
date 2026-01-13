
import { INDUSTRIES } from '@/data/industries';

const BUILD_DATE = new Date().toISOString();

export async function GET() {
    const baseUrl = 'https://buydatabase.ai';

    const paths = INDUSTRIES.map(ind => ({
        url: `/audiences/by-industry/${ind.slug}`,
        priority: '0.8'
    }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths.map(item => `
    <url>
      <loc>${baseUrl}${item.url}</loc>
      <lastmod>${BUILD_DATE}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
