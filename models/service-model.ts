import { LucideIcon } from "lucide-react";

export interface Service
{
    id: string;
    icon: LucideIcon;
    comment: string;
    title: string;
    subtitle: string;
    heroTagline: string;
    description: string;
    longDescription: string;
    features: string[];
    benefits: { title: string; description: string; }[];
    process: { step: number; title: string; description: string; }[];
    technologies: string[];
    faq: { question: string; answer: string; }[];
    relatedServices: string[];
}