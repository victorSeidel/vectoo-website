import type { MetadataRoute } from 'next';

import { findAllPublicPosts } from '@/queries/post-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
    const baseUrl = 'https://vectoo.com.br';

    const posts = await findAllPublicPosts();

    const postsRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/post/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 1,
        },
        ...postsRoutes,
    ]
}