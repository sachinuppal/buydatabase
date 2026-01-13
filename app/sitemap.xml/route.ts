
export async function GET() {
    const baseUrl = 'https://buydatabase.ai';

    const sitemaps = [
        'sitemap-static.xml',
        'sitemap-roles.xml',
        'sitemap-datasets.xml',
        // 'sitemap-audiences-combos.xml', // Deferred
        'sitemap-industries.xml',
        'sitemap-playbooks.xml', // Including as they exist
        'sitemap-answers.xml',   // Including as they exist
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(file => `
    <sitemap>
      <loc>${baseUrl}/sitemaps/${file}</loc>
      <lastmod>${new Date().toISOString()}</lastmod> 
    </sitemap>
  `).join('')}
</sitemapindex>`;
    // Note: Lastmod for the index file itself can be "now" as it changes when we add new sitemap files.
    // But the child sitemaps should have stable lastmods.

    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
