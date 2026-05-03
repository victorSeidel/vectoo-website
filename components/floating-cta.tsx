"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCTA() 
{
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => 
    {
        const handleScroll = () => { setIsVisible(window.scrollY > 500); };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

    const scrollToContact = () => { document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" }); };

    return (
        <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none" )} >

            {/* Scroll to Top */}
            <button type="button" onClick={scrollToTop} aria-label="Voltar ao topo"
                className="flex items-center justify-center p-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 text-muted-foreground 
                    hover:text-foreground hover:border-primary/30 transition-all duration-300 hover:scale-110 cursor-pointer" >
                <ArrowUp size={20} />
            </button>

            {/* Contact CTA */}
            <div className="relative">
                {showTooltip && (
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-card border border-border/50 text-sm 
                            text-foreground whitespace-nowrap animate-fade-in-up">
                        Fale conosco!
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-card" />
                    </div>
                )}
                <button type="button" onClick={scrollToContact} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}
                    aria-label="Entrar em contato" className="p-4 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(98,222,99,0.3)] 
                        hover:shadow-[0_0_30px_rgba(98,222,99,0.5)] transition-all duration-300 hover:scale-110 animate-pulse-glow cursor-pointer" >
                    <MessageCircle size={24} />
                </button>
            </div>
        </div>
    );
}
