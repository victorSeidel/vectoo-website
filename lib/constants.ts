export const COMPANY = 
{
    name: "Vectoo",
    tagline: "Soluções em Tecnologia",
    description: "Transformamos ideias em soluções digitais inovadoras. Desenvolvemos tecnologia sob medida para impulsionar seu negócio.",
    email: "contato@vectoo.com.br",
    phone: "+55 (31) 98259-0579",
    location: "Brasil",
    logoUrl: "/logo-fundo-roxo.jpeg",
} as const;

export const NAV_LINKS = 
[
    { href: "#inicio", label: "Início" },
    { href: "#servicos", label: "Serviços" },
    { href: "#sobre", label: "Sobre" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#contato", label: "Contato" },
] as const;

export const SERVICES = 
[
    {
        id: "desenvolvimento",
        title: "Desenvolvimento",
        subtitle: "Sites, Sistemas & Aplicações",
        description: "Criamos soluções digitais completas, desde landing pages até sistemas complexos. Sites institucionais, e-commerces, blogs, plataformas SaaS e aplicações web modernas.",
        features: 
        [
            "Sites e Landing Pages",
            "Sistemas Personalizados",
            "E-commerce e Lojas Virtuais",
            "Plataformas SaaS",
            "Blogs e Portais",
            "PWAs e Web Apps",
        ],
        icon: "code",
    },
    {
        id: "automacao",
        title: "Automação",
        subtitle: "Bots, CRMs & Integrações",
        description: "Automatize processos repetitivos e otimize a gestão do seu negócio. Desenvolvemos bots inteligentes, CRMs personalizados e integrações entre sistemas.",
        features: 
        [
            "Chatbots e Assistentes",
            "CRM Personalizado",
            "Automação de Processos",
            "Integrações via API",
            "Webhooks e Triggers",
            "Fluxos Automatizados",
        ],
        icon: "bot",
    },
    {
        id: "consultoria",
        title: "Consultoria",
        subtitle: "Estratégia & Planejamento",
        description: "Orientação especializada para suas decisões tecnológicas. Análise de stacks, arquitetura de sistemas, definição de regras de negócio e planejamento de desenvolvimento.",
        features: 
        [
            "Análise de Tecnologia",
            "Arquitetura de Sistemas",
            "Regras de Negócio",
            "Roadmap de Produto",
            "Code Review",
            "Mentoria Técnica",
        ],
        icon: "lightbulb",
    },
    {
        id: "seguranca",
        title: "Análise & Segurança",
        subtitle: "Auditoria & Otimização",
        description: "Avaliação completa da sua infraestrutura digital. Identificamos vulnerabilidades, problemas de performance e oportunidades de melhoria nos seus sistemas.",
        features:
        [
            "Auditoria de Segurança",
            "Análise de Performance",
            "Revisão de Banco de Dados",
            "Testes de Vulnerabilidade",
            "Relatórios Detalhados",
            "Plano de Melhorias",
        ],
        icon: "shield",
    },
] as const;

export const SOCIAL_LINKS = 
[
    { name: "Instagram", href: "https://instagram.com/vectoo.br", icon: "instagram" },
    { name: "LinkedIn", href: "https://linkedin.com/company/vectoo", icon: "linkedin" },
] as const;

export const TECHNOLOGIES = 
[
    "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS",
    "Python", "Flask", "Django",
    "Vue.js", "Laravel", "PHP",
    "Java", "Spring Boot",
    "MySQL", "PostgreSQL", "MongoDB",
    "AWS", "Docker", "Redis",
    "GraphQL", "APIs REST",
] as const;