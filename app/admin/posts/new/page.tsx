import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Novo Post' };

import { PostForm } from '@/components/Posts/PostForm';

export default async function AdminNewPostPage()
{
    return (
        <>
            <PostForm title="Novo Post" mode="create" />
        </>
    );
}