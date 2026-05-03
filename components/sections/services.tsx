"use client";

import { useState } from "react";
import { Code2, Bot, Lightbulb, Shield, ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = 
{
    code: Code2,
    bot: Bot,
    lightbulb: Lightbulb,
    shield: Shield,
};

export function ServicesSection() {
  const [activeService, setActiveService] = useState(SERVICES[0].id as 'desenvolvimento' | 'automacao' | 'consultoria' | 'seguranca');

  const activeServiceData = SERVICES.find((s) => s.id === activeService);

  return (
    <section id="servicos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            {"// Nossos Serviços"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Soluções completas para sua{" "}
            <span className="text-primary">transformação digital</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Da concepção à implementação, oferecemos serviços especializados
            para todas as etapas do seu projeto tecnológico.
          </p>
        </div>

        {/* Services Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Service Tabs */}
          <div className="col-span-4 space-y-3">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              const isActive = activeService === service.id;

              return (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={cn(
                    "cursor-pointer w-full text-left p-5 rounded-xl border transition-all duration-300 group",
                    isActive
                      ? "bg-primary/10 border-primary/30 shadow-[0_0_30px_rgba(98,222,99,0.1)]"
                      : "bg-card/30 border-border/50 hover:border-primary/20 hover:bg-card/50"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "p-3 rounded-lg transition-colors duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-semibold text-lg mb-1 transition-colors",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.subtitle}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "mt-1 transition-all duration-300",
                        isActive
                          ? "text-primary translate-x-1"
                          : "text-muted-foreground opacity-0 group-hover:opacity-100"
                      )}
                      size={20}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Detail */}
          <div className="col-span-8">
            {activeServiceData && (
              <div className="h-full p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <div className="h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {activeServiceData.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {activeServiceData.description}
                    </p>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                      O que oferecemos
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {activeServiceData.features.map((feature, index) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30 transition-all duration-300 hover:border-primary/20"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Block Visual */}
                  <div className="mt-8 p-4 rounded-lg bg-background/50 border border-border/30 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <code className="text-muted-foreground">
                      <span className="text-primary">const</span>{" "}
                      <span className="text-foreground">projeto</span> ={" "}
                      <span className="text-primary">await</span>{" "}
                      <span className="text-cyan-400">vectoo</span>.
                      <span className="text-yellow-400">
                        {activeServiceData.id}
                      </span>
                      ();
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services Grid - Mobile */}
        <div className="lg:hidden space-y-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];

            return (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
