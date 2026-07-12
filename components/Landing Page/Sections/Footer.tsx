"use client";
import Link from "next/link";
import Image from "next/image";

import { Building, Camera, Library } from "lucide-react";

import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/constants";

export const SOCIAL_LINKS = 
[
    { name: "Instagram", href: "https://instagram.com/vectoo.br", icon: Camera },
    { name: "LinkedIn", href: "https://linkedin.com/company/vectoo", icon: Building },
    { name: "Blog", href: "/blog", icon: Library },
] as const;

export function Footer()
{
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-border/30 bg-card/20">
            <h2 hidden > Rodapé </h2>
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="relative w-10 h-10 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
                                <Image src={COMPANY.logoUrl} alt="Logo Vectoo" width={40} height={40} loading="lazy" className="object-cover" />
                            </div>

                            <span className="text-xl font-bold text-foreground tracking-tight">
                                {COMPANY.name}
                            </span>
                        </Link>

                        <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
                            Transformamos ideias em soluções digitais inovadoras. Tecnologia sob medida para impulsionar o seu negócio.
                        </p>

                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map((social) =>
                            {
                                return (
                                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name}
                                            className="p-2.5 text-muted-foreground hover:text-primary bg-secondary/50 hover:bg-primary/10 rounded-lg transition-all duration-300" >
                                        <social.icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Navegação</h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm" >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
                        <ul className="space-y-2">
                            {SERVICES.map((service) => (
                                <li key={service.id}>
                                    <Link href={`#servicos`} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm" >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Contato</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary transition-colors duration-300"> {COMPANY.email} </a>
                            </li>
                            <li>
                                <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="hover:text-primary transition-colors duration-300"> {COMPANY.phone} </a>
                            </li>
                        </ul>

                        <div className="flex justify-center items-center gap-2 mt-4 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                            <p className="text-sm text-foreground font-medium"> Pronto para começar? </p>
                            <Link href="#contato" className="text-primary text-sm font-medium hover:underline" > Fale conosco → </Link>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-center gap-4">
                    <p className="text-sm text-muted-foreground text-center">
                        © {currentYear} {COMPANY.name}. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}