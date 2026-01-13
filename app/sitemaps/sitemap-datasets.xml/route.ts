
import { DATASETS } from '@/data/datasets';
import { ALL_ROLES } from '@/data/roles';

const BUILD_DATE = new Date().toISOString();

export async function GET() {
  const baseUrl = 'https://buydatabase.ai';

  // 1. Specific Dataset Pages
  const datasetUrls = DATASETS.map(d => ({
    url: `/datasets/${d.slug}`,
    priority: '0.9'
  }));

  // 2. Datasets By Role Pages
  const byRoleUrls = ALL_ROLES.map(r => ({
    url: `/datasets/by-role/${r.slug}`,
    priority: '0.7'
  }));

  const paths = [...datasetUrls, ...byRoleUrls];

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
