import { Metadata } from 'next';
export const metadata: Metadata =
{ 
    title: "Blog",
    description: "Artigos, guias e insights sobre desenvolvimento, automação, segurança e tecnologia. Conteúdo prático para impulsionar o seu negócio.",
    alternates: { canonical: "/blog" },
    openGraph:
    {
        type: "website",
        locale: "pt_BR",
        title: "Blog | Vectoo",
        description: "Artigos, guias e insights sobre desenvolvimento, automação, segurança e tecnologia.",
        siteName: "Vectoo",
    },
};

import PostsList from '@/components/Posts/PostsList';
import { findAllPublicPosts } from '@/queries/post-queries';

import { CodeComment } from "@/components/Landing Page/CodeComment";
import { FloatingCTA } from '@/components/Landing Page/FloatingCta';
import { Footer } from '@/components/Landing Page/Sections/Footer';
import { Header } from '@/components/Landing Page/Sections/Header';
import { ParticlesBackground } from "@/components/Landing Page/ParticlesBackground";

export default async function BlogPage()
{
    const posts = await findAllPublicPosts();
        
    return (
        <>
            <Header />

            <main>
                <section className="relative overflow-hidden pt-24 md:pt-40 pb-12 md:pb-24">
                    <ParticlesBackground />
                    <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 rounded-full blur-[120px]" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-6xl">
                            <CodeComment text="Blog" />

                            <h1 className="mb-6 text-4xl md:text-6xl text-foreground font-bold">
                                Ideias e insights sobre <span className="text-primary"> tecnologia </span>
                            </h1>

                            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                                Guias práticos, tendências e boas práticas em desenvolvimento, automação, segurança e mais. <br />
                                Conteúdo feito para quem quer evoluir e crescer digitalmente.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-12 md:py-20">
                    <PostsList posts={posts} />
                </section>
            </main>
            
            <Footer />
            <FloatingCTA />
        </>
    );
}