import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots
{
    return {
        rules:
        {
            userAgent: '*',
            disallow: ['/admin/', '/login'],
        },
        
        sitemap: 'https://www.vectoo.com.br/sitemap.xml',
    }
}