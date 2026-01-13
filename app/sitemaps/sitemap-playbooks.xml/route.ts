
const BUILD_DATE = new Date().toISOString();

// P0 Audit: Only include pages that actually exist.
// Currently playbooks/page.tsx has hardcoded links to:
// /playbooks/email/hr-managers-india
// /playbooks/linkedin/it-leaders-usa
// But those routes don't likely exist dynamically yet unless I coded a [channel]/[audience] route. 
// I recall seeing '[channel]/[audience]' in the file tree in previous turns?
// Let's assume they might exist or will exist, but for now I'll just map what I know is safe 
// or keep it empty if dynamic connection is missing to avoid 404s in sitemap.
// Actually, in step 486 output: "├ ƒ /playbooks/[channel]/[audience]" was visible!
// So the route exists. I just need to know valid params.
// For now, I will hardcode the two known valid ones from the index page to be safe.

export async function GET() {
  const baseUrl = 'https://buydatabase.ai';

  const paths = [
    '/playbooks/email/hr-managers-india',
    '/playbooks/linkedin/it-leaders-usa'
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths.map(p => `
    <url>
      <loc>${baseUrl}${p}</loc>
      <lastmod>${BUILD_DATE}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
