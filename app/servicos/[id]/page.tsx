import { Metadata } from 'next';

export function generateStaticParams()
{
    const services = findAllServices();
    return services.map((service) => ({ servico: service.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: {  params: Promise<{ id: string; }>; }): Promise<Metadata>
{
    const { id } = await params;
    const service = findServiceById(id);
    if (!service) return { title: 'Serviço Não Encontrado', description: 'O serviço que você procura não foi encontrado.', robots: { index: false, follow: true } };

    return { 
        title: service.title,
        description: service.description,
        keywords: [...service.features, ...service.technologies, service.title],
        alternates: { canonical: `https://vectoo.com.br/servicos/${id}` },
        openGraph: {
            type: "website",
            locale: "pt_BR",
            title: `${service.title} | Vectoo`,
            description: service.description,
            siteName: "Vectoo",
        },
    };
}

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowRight, Check, ChevronDown } from 'lucide-react';

import { findAllServices, findRelatedServices, findServiceById } from "@/database/data/services";
import { COMPANY } from '@/lib/constants';

import { Button } from '@/components/UI/Button';
import { CodeComment } from "@/components/Landing Page/CodeComment";
import { FloatingCTA } from '@/components/Landing Page/FloatingCta';
import { Footer } from '@/components/Landing Page/Sections/Footer';
import { Header } from '@/components/Landing Page/Sections/Header';
import { ParticlesBackground } from '@/components/Landing Page/ParticlesBackground';
import { TechMarquee } from '@/components/Landing Page/TechMarquee';

export default async function ServicePage({ params }: { params: Promise<{ id: string; }>; })
{
    const { id } = await params;
    const service = findServiceById(id);
    if (!service) notFound();

    const related = findRelatedServices(id);

    const serviceJsonLd =
    {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@type": "Organization", name: "Vectoo", email: COMPANY.email, telephone: COMPANY.phone },
        areaServed: "BR",
        serviceType: service.subtitle,
    };

    const breadcrumbJsonLd =
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "/" },
            { "@type": "ListItem", position: 2, name: "Serviços", item: "/servicos" },
            { "@type": "ListItem", position: 3, name: service.title, item: `/servicos/${service.id}` },
        ],
    };

    const faqJsonLd =
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <Header />
            
            <main>
                <section className="relative overflow-hidden pt-24 md:pt-40 pb-12 md:pb-24">
                    <ParticlesBackground />
                    <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 rounded-full blur-[120px]" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <nav aria-label="Breadcrumb" className="mb-12 text-sm text-muted-foreground">
                            <ol className="flex items-center gap-2">
                                <li><Link href="/" className="hover:text-primary">Início</Link></li>
                                <li aria-hidden="true">/</li>
                                <li><Link href="/servicos" className="hover:text-primary">Serviços</Link></li>
                                <li aria-hidden="true">/</li>
                                <li className="text-foreground" aria-current="page">{service.title}</li>
                            </ol>
                        </nav>

                        <div className="max-w-6xl">
                            <CodeComment text={service.comment} />

                            <h1 className="mb-4 text-4xl md:text-6xl text-foreground font-bold">
                                {service.title}
                            </h1>

                            <p className="mb-8 text-xl text-primary">
                                {service.heroTagline}
                            </p>

                            <p className="mb-8 text-muted-foreground text-lg leading-relaxed text-pretty">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button asChild className="w-56" >
                                    <Link href="/#contato" >
                                        Solicitar orçamento
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-8 text-3xl font-bold text-foreground">O que entregamos</h2>

                        <p className="mb-8 text-muted-foreground text-lg leading-relaxed text-pretty">
                            {service.longDescription}
                        </p>

                        <ul className="grid gap-4 md:grid-cols-2">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                    <span className="text-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="py-12 md:py-20 bg-card/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-8 text-3xl font-bold text-foreground">Por que escolher a Vectoo</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {service.benefits.map((benefit) => (
                                <div key={benefit.title} className="rounded-xl border border-border bg-card p-6">
                                    <h3 className="mb-2 text-lg font-bold text-foreground">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-pretty">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-8 text-3xl font-bold text-foreground">Como funciona</h2>
                        <ol className="grid gap-6 md:grid-cols-4">
                            {service.process.map((step) => (
                                <li key={step.step} className="rounded-xl border border-border bg-card p-6">
                                    <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm text-primary">
                                        {step.step}
                                    </span>
                                    <h3 className="mb-2 font-bold text-foreground">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">{step.description}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="py-12 md:py-20 bg-card/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-8 text-3xl font-bold text-foreground">Tecnologias que usamos</h2>
                        <div className="flex flex-wrap gap-3">
                            {service.technologies.map((tech) => (
                                <span key={tech} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <TechMarquee />

                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-8 text-3xl font-bold text-foreground">Perguntas frequentes</h2>
                        <div className="mx-auto max-w-3xl space-y-4">
                            {service.faq.map((faq) => (
                                <details key={faq.question} className="group p-6 bg-card border border-border hover:border-primary/50 rounded-xl transition-colors">
                                    <summary className="w-full inline-flex justify-between items-center list-none font-bold text-foreground cursor-pointer">
                                        {faq.question}
                                        <ChevronDown />
                                    </summary>
                                    <p className="mt-8 text-muted-foreground text-pretty">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-20 bg-card/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="mb-8 text-3xl font-bold text-foreground">Outros serviços</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {related.map((r) => (
                                <Link key={r.id} href={`/servicos/${r.id}`}
                                    className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50" >
                                    <h3 className="mb-2 font-bold text-foreground">{r.title}</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">{r.description}</p>
                                    <span className="mt-3 inline-flex items-center gap-2 text-sm text-primary">
                                        Ver serviço
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <FloatingCTA />
        </>
    )
}