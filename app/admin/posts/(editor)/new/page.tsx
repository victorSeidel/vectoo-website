import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Novo Post | Vectoo' };

import { PostForm } from '@/components/Posts/PostForm';

export default async function AdminNewPostPage()
{
    return (
        <>
            <PostForm title="Criar Novo Post" mode="create" />
        </>
    );
}