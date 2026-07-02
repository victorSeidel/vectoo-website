"use client";
import Link from "next/link";

import { ArrowRight, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection()
{
  return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/20 rounded-full animate-float" />
            <div className="absolute bottom-1/4 right-10 w-6 h-6 bg-primary/10 rounded-full animate-float delay-300" />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float delay-200" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8 animate-pulse-glow"> <Rocket size={32} /> </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                    Pronto para decolar seu <span className="text-primary">próximo projeto</span>?
                </h2>

                <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                    Vamos trabalhar juntos e transformar sua visão em uma solução
                    digital excepcional. O futuro do seu negócio começa agora.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(98,222,99,0.5)] hover:scale-105" >
                        <Link href="#contato">
                            Começar agora
                            <ArrowRight className="ml-2" size={18} />
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="border-primary/30 hover:border-primary/50 px-8 py-6 text-base font-semibold transition-all duration-300 hover:bg-primary/5 hover:text-white bg-transparent" >
                        <Link href="#portfolio">
                            Explorar projetos
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-border/30">
                    <p className="text-sm text-muted-foreground mb-4"> Confiado por empresas que buscam excelência </p>

                    <div className="flex items-center justify-center gap-8 opacity-50">
                        {[1, 2, 3, 4].map((i) => ( <div key={i} className="w-20 h-8 rounded bg-muted-foreground/20" /> ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}
