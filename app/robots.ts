
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/', '/api/'], // Standard disallow
        },
        sitemap: 'https://buydatabase.ai/sitemap.xml',
    };
}
