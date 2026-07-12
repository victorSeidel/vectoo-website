import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock, Calendar } from "lucide-react";

import { formatDatetime } from "@/utils/datetime";

import { Post } from "@/models/post-model";

export function FeaturedPost({ post }: { post: Post })
{
    return (
        <article className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_60px_rgba(98,222,99,0.12)]">
            <Link href={`/blog/post/${post.slug}`} className="grid lg:grid-cols-2">
                <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-95 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        
                    <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-card/60" />
                </div>

                <div className="relative flex flex-col justify-center p-8 md:p-10 lg:p-12">
                    <span className="w-fit mb-4 py-2 px-4 text-xs text-primary font-medium bg-primary/10 rounded-full"> {post.category} </span>

                    <h2 className="mb-4 text-3xl text-foreground font-bold text-balance transition-colors duration-300 group-hover:text-primary"> {post.title} </h2>

                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 text-justify"> {post.excerpt} </p>

                    <div className="flex flex-wrap items-center gap-5 mb-7 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2"> <Calendar size={15} /> {formatDatetime(post.createdAt.toString())} </span>
                        <span className="inline-flex items-center gap-2"> <Clock size={15} /> {post.readTime} min de leitura </span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                        Ler publicação <ArrowRight size={18} />
                    </span>
                </div>
            </Link>
        </article>
    );
}
