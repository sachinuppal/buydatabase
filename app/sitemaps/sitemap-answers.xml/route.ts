
const BUILD_DATE = new Date().toISOString();

// P0 Audit: Match exact list in answers/page.tsx
export async function GET() {
  const baseUrl = 'https://buydatabase.ai';

  const paths = [
    '/answers/how-to-reach-hr-managers-in-bangalore',
    '/answers/what-is-a-b2b-audience-dataset',
    '/answers/is-buying-email-lists-legal-in-india'
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths.map(p => `
    <url>
      <loc>${baseUrl}${p}</loc>
      <lastmod>${BUILD_DATE}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
