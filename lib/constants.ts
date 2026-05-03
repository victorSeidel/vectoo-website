export const COMPANY = 
{
    name: "Vectoo",
    tagline: "Soluções em Tecnologia",
    description: "Transformamos ideias em soluções digitais inovadoras. Desenvolvemos tecnologia sob medida para impulsionar o seu negócio.",
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

export const PORTFOLIO = 
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

export const TESTIMONIALS = 
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

export const ABOUT = 
{
    title: "Sobre a Vectoo",
    subtitle: "Tecnologia que transforma",
    description: `Somos uma empresa de tecnologia focada em entregar soluções digitais de alta qualidade. 
    Combinamos expertise técnica com visão de negócio para criar produtos que realmente fazem a diferença.
    
    Nossa missão é simplificar a tecnologia e torná-la acessível, permitindo que empresas de todos os tamanhos 
    possam se beneficiar de soluções inovadoras e eficientes.`,
    values: 
    [
        {
            title: "Inovação",
            description: "Buscamos constantemente novas tecnologias e metodologias para entregar as melhores soluções.",
        },
        {
            title: "Qualidade",
            description: "Código limpo, boas práticas e atenção aos detalhes em cada projeto que desenvolvemos.",
        },
        {
            title: "Parceria",
            description: "Trabalhamos lado a lado com nossos clientes, entendendo suas necessidades e objetivos.",
        },
        {
            title: "Transparência",
            description: "Comunicação clara e honesta em todas as etapas do desenvolvimento.",
        },
    ],
} as const;

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