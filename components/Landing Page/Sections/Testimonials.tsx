"use client";
import { useState, useEffect } from "react";

import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const TESTIMONIALS = 
[
    {
        id: 1,
        name: "Carlos Silva",
        role: "CEO",
        company: "",
        content: "A Vectoo transformou completamente nossa operação. O sistema desenvolvido aumentou nossa eficiência e reduziu custos operacionais significativamente.",
        avatar: "/avatars/carlos.jpg",
    },
    {
        id: 2,
        name: "Ana Martins",
        role: "Diretora de Marketing",
        company: "",
        content: "Profissionais excepcionais. Entregaram nosso e-commerce no prazo, com qualidade impecável.",
        avatar: "/avatars/ana.jpg",
    },
    {
        id: 3,
        name: "Roberto Costa",
        role: "CTO",
        company: "",
        content: "A consultoria de segurança identificou vulnerabilidades críticas que passaram despercebidas. Recomendo fortemente para qualquer empresa que leva tecnologia a sério.",
        avatar: "/avatars/roberto.jpg",
    },
] as const;

export function TestimonialsSection() 
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => 
    {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => { setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length); }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrev = () => 
    {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const handleNext = () => 
    {
        setIsAutoPlaying(false);
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[150px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                        {"// Depoimentos"}
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                        O que nossos <span className="text-primary">clientes dizem</span>
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="absolute -top-6 left-8 md:left-12 z-10"> <Quote size={48} className="text-primary/20 fill-primary/10" /> </div>

                        <div className="relative p-8 md:p-12 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <div key={testimonial.id}
                                    className={cn("transition-all duration-500",
                                        index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none")} >

                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => ( <Star key={i} size={20} className="text-primary fill-primary"/> ))}
                                    </div>

                                    <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                                        &ldquo;{testimonial.content}&rdquo;
                                    </blockquote>

                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-foreground"> {testimonial.name} </p>
                                            <p className="text-sm text-muted-foreground"> {testimonial.role} • {testimonial.company} </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <div className="flex gap-2">
                                {TESTIMONIALS.map((_, index) => (
                                    <button key={index} onClick={() => { setIsAutoPlaying(false); setActiveIndex(index); }} aria-label={`Ver depoimento ${index + 1}`}
                                            className="flex h-10 w-10 items-center justify-center" >
                                        <span className={cn("rounded-full transition-all duration-300",
                                            index === activeIndex ? "h-2 w-8 bg-primary" : "h-2 w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50")} />
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <button onClick={handlePrev} aria-label="Depoimento anterior"
                                    className="p-3 rounded-full border border-border/50 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300">
                                    <ChevronLeft size={20} />
                                </button>

                                <button onClick={handleNext} aria-label="Próximo depoimento"
                                    className="p-3 rounded-full border border-border/50 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}