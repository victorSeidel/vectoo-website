import { Service } from "@/models/service-model";

import { Computer } from "lucide-react";

export function findAllServices()
{
    return SERVICES;
}

export function findServiceById(id: string): Service | undefined
{
    return SERVICES.find((service) => service.id === id);
}

export function findRelatedServices(id: string): Service[]
{
    const service = findServiceById(id);
    if (!service) return [];
    return SERVICES.filter((s) => service.relatedServices.includes(s.id));
}

export const SERVICES: Service[] =
[
    {
        id: "desenvolvimento-de-sites-e-sistemas",
        icon: Computer,
        title: "Desenvolvimento de Sites e Sistemas",
        subtitle: "Desenvolvimento",
        heroTagline: "Do zero à produção, com código que escala",
        description: "",
        seoDescription: "Desenvolvimento web personalizado: sites institucionais, e-commerces, sistemas e plataformas SaaS. Tecnologia moderna e código de qualidade para o seu negócio.",
        longDescription: "Construímos produtos digitais completos e sob medida, alinhados à estratégia do seu negócio. Nossa abordagem une performance, escalabilidade e boas práticas de engenharia desde a primeira linha de código, garantindo sistemas fáceis de manter e prontos para crescer junto com a sua operação.",
        features: ["Automação", "Segurança"],
        benefits:
        [
            { title: "Código escalável", description: "Arquitetura pensada para crescer sem retrabalho conforme a demanda aumenta." },
            { title: "Performance real", description: "Sites e sistemas otimizados para velocidade, Core Web Vitals e SEO técnico." },
            { title: "Entrega contínua", description: "Ciclos curtos de desenvolvimento com entregas visíveis e feedback constante." },
            { title: "Suporte pós-entrega", description: "Acompanhamento após o lançamento para ajustes, evolução e novas features." },
        ],
        process:
        [
            { step: 1, title: "Descoberta", description: "Entendemos o problema, o público e os objetivos do projeto." },
            { step: 2, title: "Arquitetura", description: "Definimos stack, estrutura de dados e fluxo do sistema." },
            { step: 3, title: "Desenvolvimento", description: "Construção com entregas incrementais e testes contínuos." },
            { step: 4, title: "Deploy e evolução", description: "Publicação, monitoramento e melhorias contínuas." },
        ],
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        faq:
        [
            {
                question: "Quanto tempo leva para desenvolver um site ou sistema?",
                answer: "Depende do escopo. Uma landing page pode ficar pronta em poucos dias; sistemas mais complexos levam de algumas semanas a poucos meses. Definimos um prazo claro após o levantamento inicial.",
            },
            {
                question: "Vocês trabalham com projetos já existentes?",
                answer: "Sim, atuamos tanto em projetos novos quanto na evolução, manutenção e refatoração de sistemas já em produção.",
            },
            {
                question: "O sistema fica sob minha propriedade?",
                answer: "Sim, todo o código e a documentação são entregues ao cliente, sem dependência de fornecedor.",
            },
        ],
        relatedServices: ["desenvolvimento", "seguranca"],
    },
];