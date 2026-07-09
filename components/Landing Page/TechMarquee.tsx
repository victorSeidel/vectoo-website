"use client";

import { TECHNOLOGIES } from "@/lib/constants";

export function TechMarquee() 
{
    const techs = [...TECHNOLOGIES, ...TECHNOLOGIES];

    return (
        <div className="relative py-12 overflow-hidden border-y border-border/20 bg-card/20">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />

            <div className="flex animate-marquee">
                {techs.map((tech, index) => (
                    <div key={`${tech}-${index}`} className="flex items-center gap-3 px-8 whitespace-nowrap" >
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                        <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"> {tech} </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
