"use client";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileQuestion, Search } from "lucide-react";

import { POST_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Post } from "@/models/post-model";

import { Input } from "@/components/UI/Input";

import { FeaturedPost } from "@/components/Posts/FeaturedPost";
import { PostCard } from "@/components/Posts/PostCard";

const POSTS_PER_PAGE = 6;

export default function PostsList({ posts }: { posts: Post[] })
{
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Todos");
    const [page, setPage] = useState(1);

    const featured = useMemo(() => posts[0], []);
    const showFeatured = category === "Todos" && query.trim() === "" && !!featured;

    const filtered = useMemo(() =>
    {
        const normalized = query.trim().toLowerCase();

        return posts.filter((post) =>
        {
            if (showFeatured && post.id === featured?.id) return false;

            const matchesCategory = category === "Todos" || post.category === category;
            const matchesQuery = normalized === "" || post.title.toLowerCase().includes(normalized) ||
                post.excerpt.toLowerCase().includes(normalized) || post.tags.some((tag) => tag.toLowerCase().includes(normalized));

            return matchesCategory && matchesQuery;
        });
    }, [query, category]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    function handleCategoryChange(next: string) { setCategory(next); setPage(1); }
    function handleQueryChange(next: string) { setQuery(next); setPage(1); }

    return (
        <section className="container mx-auto px-4 md:px-6">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <Input type="search" value={query} onChange={(e) => handleQueryChange(e.target.value)} aria-label="Buscar publicações"
                        placeholder="Buscar publicações..." className="h-11 pl-10" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                    {["Todos", ...POST_CATEGORIES].map((cat) => (
                        <button type="button" key={cat} onClick={() => handleCategoryChange(cat)}
                            className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                category === cat 
                                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(98,222,99,0.3)]"
                                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary")}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {showFeatured && featured && ( <div className="mb-12"> <FeaturedPost post={featured} /> </div> )}

            {paginated.length > 0
            ? 
            (
                <>
                    <div className="grid gap-6 md:grid-cols-3">
                        {paginated.map((post) => ( <PostCard key={post.slug} post={post} /> ))}
                    </div>

                    {totalPages > 1 && (
                        <nav aria-label="Paginação" className="mt-12 flex items-center justify-center gap-2" >
                            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Página anterior"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground
                                    transition-all duration-300 hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-40" >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button  type="button" key={p} onClick={() => setPage(p)} aria-current={p === currentPage ? "page" : undefined}
                                    className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300",
                                        p === currentPage
                                            ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(98,222,99,0.3)]"
                                            : "border border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-primary")} >
                                    {p}
                                </button>
                            ))}

                            <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Próxima página"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground
                                    transition-all duration-300 hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-40" >
                                <ChevronRight size={18} />
                            </button>
                        </nav>
                    )}
                </>
            )
            : 
            (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/30 py-20 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground">
                        <FileQuestion size={26} />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        Nenhuma publicação encontrada
                    </h3>

                    <p className="text-base text-muted-foreground">
                        Não encontramos resultados para sua busca. <br />
                        Tente outros termos ou selecione outra categoria.
                    </p>
                </div>
            )}
        </section>
    )
}