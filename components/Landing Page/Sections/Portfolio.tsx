"use client";
import { useState } from "react";

import { ExternalLink, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { CodeComment } from "@/components/Landing Page/CodeComment";

const PORTFOLIO = 
[
    {
        id: 1,
        title: "Sistema de Gestão Empresarial",
        category: "Sistema",
        description: "ERP completo com módulos de vendas, estoque, financeiro e RH. Dashboard em tempo real e relatórios avançados.",
        tags: ["PHP", "Laravel", "MySQL"],
        image: "/portfolio/erp.png",
    },
    {
        id: 2,
        title: "E-commerce de Moda",
        category: "E-commerce",
        description: "Loja virtual com gestão de produtos, carrinho inteligente, checkout otimizado e integração com gateways de pagamento.",
        tags: ["Next.js", "Stripe", "Tailwind"],
        image: "/portfolio/erp.png",
    },
    {
        id: 3,
        title: "Software de Divulgação",
        category: "SaaS",
        description: "Plataforma SaaS para conectar empresários a influenciadores e facilitar parcerias estratégicas.",
        tags: ["React", "TypeScript", "PostgreSQL"],
        image: "/portfolio/saas.jpg",
    },
    {
        id: 4,
        title: "Chatbot de Atendimento",
        category: "Automação",
        description: "Bot inteligente para WhatsApp com IA, integração com CRM e fluxos automatizados de atendimento 24/7.",
        tags: ["n8n", "LLMs", "Python"],
        image: "/portfolio/chatbot.jpg",
    },
    {
        id: 5,
        title: "Dashboard Analytics",
        category: "Sistema",
        description: "Painel de métricas em tempo real com visualizações interativas, alertas customizáveis e exportação de dados.",
        tags: ["VBA", "Power BI", "Firebase"],
        image: "/portfolio/dashboard.jpg",
    },
    {
        id: 6,
        title: "App de Delivery",
        category: "Aplicação",
        description: "Aplicativo completo para restaurantes com pedidos, rastreamento em tempo real e gestão de entregadores.",
        tags: ["React Native", "Java", "MongoDB"],
        image: "/portfolio/delivery.jpg",
    },
    {
        id: 7,
        title: "Plataforma de Cursos Online",
        category: "Sistema",
        description: "Sistema de ensino à distância com vídeo-aulas, quizzes, certificados automáticos e área do aluno completa.",
        tags: ["Vue.js", "Laravel", "AWS"],
        image: "/portfolio/cursos.jpg",
    },
] as const;

const categories = ["Todos", ...new Set(PORTFOLIO.map((p) => p.category))];

export function PortfolioSection() 
{
    const [activeCategory, setActiveCategory] = useState("Todos");
    const filteredProjects = activeCategory === "Todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-12 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <CodeComment text="Portfólio" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Projetos que{" "}
            <span className="text-primary">entregamos com excelência</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes.
            Cada solução é única e pensada para resolver problemas reais.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(98,222,99,0.3)]"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(98,222,99,0.1)]",
                index === 0 && filteredProjects.length > 2 && "md:col-span-2 lg:col-span-2",
                index === 3 && filteredProjects.length > 4 && "lg:col-span-2"
              )}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative p-6 md:p-8 h-full flex flex-col">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-secondary/50 text-muted-foreground text-xs font-mono border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Decorative Code Element */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <code className="font-mono text-4xl text-primary">
                    {`{${index + 1}}`}
                  </code>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Quer ver mais projetos ou discutir sua ideia?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            <span>Vamos conversar</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
