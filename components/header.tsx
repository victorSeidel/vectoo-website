"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() 
{
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => 
    {
        const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" : "bg-transparent py-5")}>

            <div className="container mx-auto px-4 md:px-6">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
                            <Image src={COMPANY.logoUrl} alt={"Logo" + COMPANY.name} fill priority className="object-cover" />
                        </div>
                        <span className="text-xl font-bold text-foreground tracking-tight">
                            {COMPANY.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors 
                                        duration-300 group" >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 
                                hover:shadow-[0_0_20px_rgba(98,222,99,0.4)]" >
                            <Link href="#contato">Iniciar Projeto</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                            className="md:hidden p-2 text-foreground hover:text-primary transition-colors" >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn( "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-300 overflow-hidden",
                    isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0" )}>
                <ul className="flex flex-col p-4 gap-2">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors" >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li className="pt-2">
                        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link href="#contato" onClick={() => setIsMobileMenuOpen(false)}>
                                Iniciar Projeto
                            </Link>
                        </Button>
                    </li>
                </ul>
            </div>
        </header>
    );
}
