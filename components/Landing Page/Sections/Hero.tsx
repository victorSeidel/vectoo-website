import Link from "next/link";

import { ArrowRight, Sparkles } from "lucide-react";

import { COMPANY } from "@/lib/constants";

import { AnimatedCode } from "@/components/Landing Page/AnimatedCode";
import { ParticlesBackground } from "@/components/Landing Page/ParticlesBackground";

import { Button } from "@/components/UI/Button";

export function HeroSection() 
{
    const STATS = 
    [
        { value: "50+",  label: "Projetos Entregues" },
        { value: "20+",  label: "Clientes Satisfeitos" },
        { value: "3+",   label: "Anos de Experiência" },
        { value: "100%", label: "Taxa de Satisfação" },
    ] as const;

    return (
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden" >
            <ParticlesBackground />
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
            <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-float delay-300" />

            <AnimatedCode />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
                        <Sparkles size={16} />
                        Soluções em Tecnologia
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up delay-100 text-balance">
                        Transformamos ideias em soluções digitais
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
                        {COMPANY.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
                        <Button variant="outline" size="lg" className="w-48" >
                            <Link href="#portfolio">
                                Ver Projetos
                            </Link>
                        </Button>

                        <Button asChild size="lg" className="w-48" >
                            <Link href="#contato">
                                Iniciar Projeto <ArrowRight className="ml-2" size={18} />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up delay-400">
                        {STATS.map((stat, index) => (
                            <div key={stat.label}
                                className="relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-300
                                    hover:border-primary/30 hover:bg-card/80 group" style={{ animationDelay: `${400 + index * 100}ms` }} >

                                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="relative">
                                    <span className="block text-3xl md:text-4xl font-bold text-primary mb-1"> {stat.value} </span>
                                    <span className="text-sm text-muted-foreground"> {stat.label} </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}