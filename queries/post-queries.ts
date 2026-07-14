import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { postRepository } from '@/repositories/post-repository';

export const findAllPosts = cache(async () => { return postRepository.findAll(); });

export const findAllPublicPosts = cache(unstable_cache(async () => { return await postRepository.findAllPublic(); }, ['posts'], { tags: ['posts'] }));

export const findPostById = cache(async (id: string) => { return postRepository.findById(id); });

export const findPublicPostBySlug = cache((slug: string) =>
{
    return unstable_cache(async (slug: string) => 
    {
        const post = await postRepository.findBySlugPublic(slug).catch(() => undefined);
        if (!post) notFound();

        return post;
    }, [`post-${slug}`], { tags: [`post-${slug}`] })(slug);
});

export const findRelatedPosts = cache((id: string) =>
    unstable_cache(() => postRepository.findRelated(id), [`related-posts-${id}`], { tags: [`related-posts-${id}`, 'posts'] })()
);