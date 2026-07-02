"use client";
import Link from "next/link";
import Image from "next/image";

import { Heart } from "lucide-react";

import { COMPANY, NAV_LINKS, SERVICES, SOCIAL_LINKS } from "@/lib/constants";

const socialIcons = { github: Heart, linkedin: Heart, instagram: Heart, twitter: Heart };

export function Footer()
{
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-border/30 bg-card/20">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand Column */}
                <div className="lg:col-span-1">
                    <Link href="/" className="flex items-center gap-3 mb-6 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
                        <Image
                        src={COMPANY.logoUrl || "/placeholder.svg"}
                        alt={COMPANY.name}
                        fill
                        className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-foreground tracking-tight">
                        {COMPANY.name}
                    </span>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Transformamos ideias em soluções digitais inovadoras. Tecnologia
                    sob medida para impulsionar o seu negócio.
                    </p>
                    {/* Social Links */}
                    <div className="flex gap-3">
                    {SOCIAL_LINKS.map((social) => {
                        const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                        return (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                            aria-label={social.name}
                        >
                            <Icon size={18} />
                        </a>
                        );
                    })}
                    </div>
                </div>

                {/* Navigation Column */}
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
                    <ul className="space-y-3">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                        >
                            {link.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Services Column */}
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
                    <ul className="space-y-3">
                    {SERVICES.map((service) => (
                        <li key={service.id}>
                        <Link
                            href={`#servicos`}
                            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                        >
                            {service.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Contato</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>
                        <a
                        href={`mailto:${COMPANY.email}`}
                        className="hover:text-primary transition-colors duration-300"
                        >
                        {COMPANY.email}
                        </a>
                    </li>
                    <li>
                        <a
                        href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                        className="hover:text-primary transition-colors duration-300"
                        >
                        {COMPANY.phone}
                        </a>
                    </li>
                    <li>{COMPANY.location}</li>
                    </ul>

                    {/* CTA */}
                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm text-foreground font-medium mb-2">
                        Pronto para começar?
                    </p>
                    <Link
                        href="#contato"
                        className="text-primary text-sm font-medium hover:underline"
                    >
                        Fale conosco →
                    </Link>
                    </div>
                </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground text-center">
                    © {currentYear} {COMPANY.name}. Todos os direitos reservados.
                </p>
                </div>
            </div>
        </footer>
    );
}
