import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Clock, Calendar } from "lucide-react";

import { Post } from "@/models/post-model";
import { formatDatetime } from "@/utils/datetime";

export function PostCard({ post }: { post: Post })
{
    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm
                transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(98,222,99,0.1)]">

            <Link href={`/blog/post/${post.slug}`} className="flex flex-col h-full">
                <div className="relative aspect-16/10 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105" />

                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />

                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm">
                        {post.category}
                    </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"> <Calendar size={13} /> {formatDatetime(post.createdAt.toString())} </span>
                        <span className="inline-flex items-center gap-1.5"> <Clock size={13} /> {post.readTime} min </span>
                    </div>

                    <h3 className="mb-2 text-lg text-foreground font-bold text-balance transition-colors duration-300 group-hover:text-primary"> {post.title} </h3>

                    <p className="flex-1 mb-4 text-sm text-muted-foreground text-justify leading-relaxed line-clamp-3"> {post.excerpt} </p>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="px-2.5 py-1 rounded-lg bg-secondary/50 text-muted-foreground text-xs font-mono border border-border/40" >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border/50 text-muted-foreground
                                group-hover:border-primary group-hover:text-primary transition-all duration-300">
                            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
