"use client";
import { useEffect, useRef, useState } from "react";

import { Target, Heart, Users, Eye } from "lucide-react";

import { TECHNOLOGIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { CodeComment } from "@/components/Landing Page/CodeComment";

const VALUES = 
[
    {
        icon: Target,
        title: "Inovação",
        description: "Buscamos constantemente novas tecnologias e metodologias para entregar as melhores soluções.",
    },
    {
        icon: Heart,
        title: "Qualidade",
        description: "Código limpo, boas práticas e atenção aos detalhes em cada projeto que desenvolvemos.",
    },
    {
        icon: Users,
        title: "Parceria",
        description: "Trabalhamos lado a lado com nossos clientes, entendendo suas necessidades e objetivos.",
    },
    {
        icon: Eye,
        title: "Transparência",
        description: "Comunicação clara e honesta em todas as etapas do desenvolvimento.",
    },
];

export function AboutSection() 
{
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => 
    {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); } }, { threshold: 0.2 });
        if (sectionRef.current) { observer.observe(sectionRef.current); }
        return () => observer.disconnect();
    }, []);

    const BackgroundElements = () =>
    (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 bg-secondary/30 rounded-full blur-[100px]" />
            
            <div className="absolute inset-0"
                style={{ backgroundImage: `linear-gradient(rgba(98, 222, 99, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(98, 222, 99, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%)',
                }} />
        </div>
    );

    return (
        <section id="sobre" ref={sectionRef} className="relative py-12 md:py-24 overflow-hidden" >
            <BackgroundElements />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className={cn("transition-all duration-1000", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
                        <CodeComment text="Quem Somos" />

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                            Tecnologia que transforma
                        </h2>

                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Somos uma empresa de tecnologia focada em entregar soluções digitais de alta qualidade. <br />
                                Combinamos expertise técnica com visão de negócio para criar produtos que realmente fazem a diferença.
                            </p>
    
                            <p>
                                Nossa missão é simplificar a tecnologia e torná-la acessível,
                                permitindo que empresas de todos os tamanhos possam se beneficiar de soluções inovadoras e eficientes.
                            </p>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                Tecnologias que dominamos
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {TECHNOLOGIES.map(tech => (
                                    <span key={tech}
                                        className={cn(`px-3 py-1.5 text-sm rounded-lg bg-secondary/50 text-muted-foreground border border-border/30 transition-all 
                                            duration-300 hover:border-primary/30 hover:text-foreground`, isVisible ? "opacity-100" : "opacity-0")}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={cn("transition-all duration-1000 delay-200", isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10")}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {VALUES.map((value, index) => 
                            {
                                return (
                                    <div key={value.title} style={{ transitionDelay: `${300 + index * 100}ms` }}
                                        className={cn(`group p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm transition-all duration-500
                                            hover:border-primary/30 hover:bg-card/50`, isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>

                                        <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:bg-primary 
                                                group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(98,222,99,0.3)]">
                                            <value.icon size={24} />
                                        </div>

                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {value.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 p-6 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-primary">V</span>
                                    </div>
                                    <div className="absolute -inset-2 rounded-full border border-primary/30 animate-pulse" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Vectoo</p>
                                    <p className="text-sm text-muted-foreground"> Vetor de inovação para seu negócio </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
