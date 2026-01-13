
// P0: Fix Lastmod and Priorities
const BUILD_DATE = new Date().toISOString();
// In a real CI/CD, this would come from process.env.NEXT_PUBLIC_BUILD_TIME or git commit.
// For now, we fix it to a stable timestamp so it doesn't churn on every request.

// Manual list of truly static top-level pages
export async function GET() {
  const baseUrl = 'https://buydatabase.ai';

  const paths = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/datasets', priority: '0.9', changefreq: 'daily' }, // Hub
    { url: '/audiences', priority: '0.9', changefreq: 'daily' }, // Hub
    { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' },
    { url: '/how-it-works', priority: '0.7', changefreq: 'monthly' },
    { url: '/activation', priority: '0.7', changefreq: 'monthly' },
    // Core Hubs
    { url: '/audiences/by-industry', priority: '0.8', changefreq: 'weekly' },
    { url: '/datasets/by-role', priority: '0.8', changefreq: 'weekly' },
    { url: '/use-cases', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources', priority: '0.6', changefreq: 'weekly' },
    { url: '/glossary', priority: '0.6', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' }, // Blog index changes often
    // Legal - Low Priority
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/about/data-philosophy', priority: '0.4', changefreq: 'yearly' },
    { url: '/about/data-compliance', priority: '0.4', changefreq: 'yearly' },
    { url: '/about/data-use-guidelines', priority: '0.4', changefreq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths.map(item => `
    <url>
      <loc>${baseUrl}${item.url}</loc>
      <lastmod>${BUILD_DATE}</lastmod>
      <changefreq>${item.changefreq}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
