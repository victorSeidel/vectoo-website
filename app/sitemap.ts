import type { MetadataRoute } from 'next';

import { findAllPublicPosts } from '@/queries/post-queries';
import { findAllServices } from '@/database/data/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
    const baseUrl = 'https://www.vectoo.com.br';

    const posts = await findAllPublicPosts();
    const postsRoutes = posts.map((post) => ({ url: `${baseUrl}/blog/post/${post.slug}` }));

    const services = findAllServices();
    const servicesRoutes = services.map((service) => ({ url: `${baseUrl}/servicos/${service.id}` }));

    return [
        { url: baseUrl },

        { url: `${baseUrl}/servicos` },
        ...servicesRoutes,
        
        { url: `${baseUrl}/blog` },
        ...postsRoutes,
    ]
}