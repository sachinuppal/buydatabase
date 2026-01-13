
import { ALL_ROLES } from '@/data/roles';
import { ROLE_GROUPS } from '@/data/role-groups';

const BUILD_DATE = new Date().toISOString();

export async function GET() {
  const baseUrl = 'https://buydatabase.ai';

  // 1. Specific Roles
  const roleUrls = ALL_ROLES.map(role => ({
    url: `/audiences/by-role/${role.slug}`,
    priority: '0.8'
  }));

  // 2. Group Roles
  const groupUrls = Object.keys(ROLE_GROUPS).map(slug => ({
    url: `/audiences/by-role/${slug}`,
    priority: '0.8' // Groups are high value hubs
  }));

  const paths = [...roleUrls, ...groupUrls];

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
