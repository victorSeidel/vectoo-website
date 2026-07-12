import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Posts' };

import Link from 'next/link';

import { findAllPosts } from '@/queries/post-queries';

import { Button } from '@/components/UI/Button';

export default async function AdminPostsPage()
{
    const posts = await findAllPosts();

    return (
        <div className="container flex flex-col justify-center items-center gap-8 mx-auto py-16">
            <div className="w-full flex justify-between items-center" >
                <h1 className="text-xl"> Lista de Posts </h1>

                <div className="space-x-2">
                    <Button asChild variant="outline" >
                        <Link href='/admin' > Voltar </Link>
                    </Button>
                    <Button asChild >
                        <Link href='/admin/posts/new' > Novo Post </Link>
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
                {posts.map((post) => ( 
                    <article key={post.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm
                            transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(98,222,99,0.1)]">

                        <Link href={`/admin/posts/${post.id}`} className="flex flex-col h-full">
                            <div className="relative flex flex-1 flex-col p-6">
                                <h3 className="text-lg font-bold text-foreground mb-2 text-balance transition-colors duration-300 group-hover:text-primary">
                                    {post.title}
                                </h3>

                                <span className="text-xs text-gray-400 mb-4"> {post.published ? "Publicado" : "Rascunho"} </span>

                                <p className="flex-1 mb-4 text-sm text-muted-foreground text-justify leading-relaxed line-clamp-3"> {post.excerpt} </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.slice(0, 4).map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-secondary/50 text-muted-foreground text-xs font-mono border border-border/40" >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}