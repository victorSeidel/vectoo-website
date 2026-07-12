import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Editar Post | Vectoo' };

import { notFound } from 'next/navigation';

import { findPostById } from '@/queries/post-queries';
import { makePartialPost } from '@/models/post-model';
import { PostForm } from '@/components/Posts/PostForm';

export default async function AdminPostPage({ params }: {  params: Promise<{ id: string; }>; })
{
    const { id } = await params;
    let post = await findPostById(id).catch(() => undefined);
    if (!post) notFound();

    post = makePartialPost(post);
    
    return (
        <>
            <PostForm title="Editar Post" mode="update" post={post} />
        </>
    );
}