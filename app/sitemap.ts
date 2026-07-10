import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap
{
    return [
        {
            url: 'https://vectoo.com.br',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ]
}