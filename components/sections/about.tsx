"use client";
import { useEffect, useRef, useState } from "react";

import { Target, Heart, Users, Eye } from "lucide-react";

import { ABOUT, TECHNOLOGIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const valueIcons = [Target, Heart, Users, Eye];

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
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >

        <BackgroundElements />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div
            className={cn(
              "transition-all duration-1000",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              {"// Quem Somos"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {ABOUT.subtitle}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {ABOUT.description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>

            {/* Technologies */}
            <div className="mt-10">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Tecnologias que dominamos
              </h4>
              <div className="flex flex-wrap gap-2">
                {TECHNOLOGIES.map((tech, index) => (
                  <span
                    key={tech}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg bg-secondary/50 text-muted-foreground border border-border/30 transition-all duration-300 hover:border-primary/30 hover:text-foreground",
                      isVisible ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Values */}
          <div
            className={cn(
              "transition-all duration-1000 delay-200",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            )}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {ABOUT.values.map((value, index) => {
                const Icon = valueIcons[index];
                return (
                  <div
                    key={value.title}
                    className={cn(
                      "group p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/50",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    )}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(98,222,99,0.3)]">
                      <Icon size={24} />
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

            {/* Visual Element */}
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
                  <p className="text-sm text-muted-foreground">
                    Vetor de inovação para seu negócio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
