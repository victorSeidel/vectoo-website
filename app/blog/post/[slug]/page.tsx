import { Metadata } from 'next';
export async function generateMetadata({ params }: {  params: Promise<{ slug: string; }>; }): Promise<Metadata>
{
    const { slug } = await params;
    const post = await findPublicPostBySlug(slug).catch(() => undefined);
    if (!post) return { title: 'Post Não Encontrado', description: 'O post que você procura não foi encontrado.', robots: { index: false, follow: true } };

    return { 
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `https://vectoo.com.br/blog/post/${slug}` },
        openGraph: {
            type: "article",
            locale: "pt_BR",
            title: post.title,
            description: post.excerpt,
            images: [{ url: post.coverImage }],
            publishedTime: post.createdAt.toString(),
            authors: [post.author],
            siteName: "Vectoo",
        },
    };
}

import { notFound } from 'next/navigation';

import { findPublicPostBySlug } from '@/queries/post-queries';

import { Markdown } from '@/components/UI/Markdown';

export default async function PostPage({ params }: { params: Promise<{ slug: string; }>; })
{
    const { slug } = await params;
    const post = await findPublicPostBySlug(slug).catch(() => undefined);
    if (!post) notFound();
    
    return (
        <>
            <header className="group flex flex-col gap-2 mb-4">
                {post.title}

                <div className="flex gap-2">
                    <a href={post.authorSocial} target="_blank" rel="noopener noreferrer" > {post.author} </a>
                    |
                    <p className="text-gray-800"> {post.createdAt.toString()} </p>
                </div>
            </header>

            <p className="text-justify text-sm text-gray-600" >
                {post.excerpt}
            </p>

            <Markdown className="text-justify text-black">
                {post.content}
            </Markdown>
        </>
    );
}