import type { MetadataRoute } from 'next';

import { findAllPublicPosts } from '@/queries/post-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
    const baseUrl = 'https://vectoo.com.br';

    const posts = await findAllPublicPosts();
    const postsRoutes = posts.map((post) => ({ url: `${baseUrl}/blog/post/${post.slug}` }));

    return [
        { url: baseUrl },
        { url: `${baseUrl}/blog` },
        ...postsRoutes,
    ]
}