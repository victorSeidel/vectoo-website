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

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

import { findPublicPostBySlug, findRelatedPosts } from '@/queries/post-queries';
import { formatDatetime } from '@/utils/datetime';

import { Footer } from '@/components/Landing Page/Sections/Footer';
import { Header } from '@/components/Landing Page/Sections/Header';

import { Markdown } from '@/components/UI/Markdown';
import { PostCard } from '@/components/Posts/PostCard';
import { ReadingProgress } from '@/components/Posts/ReadingProgress';
import { ShareButtons } from '@/components/Posts/ShareButtons';

export default async function PostPage({ params }: { params: Promise<{ slug: string; }>; })
{
    const { slug } = await params;
    const post = await findPublicPostBySlug(slug).catch(() => undefined);
    if (!post) notFound();

    const related = await findRelatedPosts(post.id);

    const sectionClasses = "container mx-auto";
    const secChildClasses = "max-w-5xl mx-auto";
    
    return (
        <>
            <Header />
            
            <ReadingProgress />

            <main>
                <article className="bg-gray-100">
                    <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-6 md:px-0 bg-background">
                        <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px]" />
                        <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 rounded-full blur-[120px]" />

                        <div className={sectionClasses} >
                            <div className={secChildClasses} >
                                <span className="py-1 px-3 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                                    {post.category}
                                </span>

                                <h1 className="mt-6 mb-4 text-3xl md:text-4xl text-foreground font-bold text-balance leading-tight">
                                    {post.title}
                                </h1>

                                <p className="mb-8 text-muted-foreground leading-relaxed text-pretty">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-y-3 gap-x-4 md:gap-x-6 pt-8 text-sm text-muted-foreground border-t border-border/50">
                                 
                                    <Link href={post.authorSocial} className="inline-flex items-center gap-2 hover:text-primary hover:underline">
                                        <User size={15} className="text-primary" />
                                        {post.author}
                                    </Link>

                                    <span className="inline-flex items-center gap-2">
                                        <Calendar size={15} className="text-primary" />
                                        {formatDatetime(post.createdAt.toString())}
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <Clock size={15} className="text-primary" />
                                        {post.readTime} min de leitura
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="py-12 px-6 md:px-0">
                        <div className={sectionClasses} >
                            <div className={secChildClasses} >
                                <div className="relative aspect-video mb-12 border border-border/50 rounded-3xl overflow-hidden">
                                    <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
                                </div>

                                <Markdown> {post.content} </Markdown>

                                <Link href={post.authorSocial} className="flex gap-4 mt-8 p-4 group">
                                    <div className="w-12 h-12 flex justify-center items-center rounded-full bg-primary-dark text-lg text-white font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-900 font-semibold">{post.author}</p>
                                        <p className="inline-flex items-center gap-2 text-sm text-primary-dark font-medium group-hover:underline">
                                            Conheça o autor
                                            <ArrowRight size={12}/>
                                        </p>
                                    </div>
                                </Link>

                                <div className="flex flex-wrap items-center gap-2 mt-8 text-xs">
                                    <span className="text-gray-800 font-medium" > Tags: </span>
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="py-1.5 px-3 text-gray-900 font-mono bg-gray-300 rounded-lg" >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="my-6 border-t border-gray-300" />

                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 bg-primary/5 border border-primary/40 rounded-2xl">
                                    <div className="flex flex-col">
                                        <p className="text-gray-900 font-semibold">Gostou? Compartilhe!</p>
                                        <p className="text-sm text-gray-600">Ajude mais pessoas a ficarem informadas.</p>
                                    </div>
                                    
                                    <ShareButtons title={post.title} slug={post.slug} />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                <section className="relative overflow-hidden py-16 px-6 md:px-0 border-t border-border/50 bg-background">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[150px]" />
                    <div className={sectionClasses} >
                        <div className={secChildClasses} >
                            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-3 block">
                                {"// Continue lendo"}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
                                Publicações relacionadas
                            </h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                {related.map((rp) => (
                                    <PostCard key={rp.slug} post={rp} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}