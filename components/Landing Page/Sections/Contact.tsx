"use client";
import React, { useState } from "react";

import { Send, Mail, Phone, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";

import emailjs from "@emailjs/browser";

import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Textarea } from "@/components/UI/Textarea";

export function ContactSection() 
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = async (e: React.SubmitEvent) => 
    {
        e.preventDefault();
        setIsSubmitting(true);

        try 
        {
            await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

            setIsSubmitted(true);

            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setIsSubmitted(false), 5000);
        } 
        catch (error) { alert("Erro ao enviar a mensagem. Tente novamente."); } 
        finally { setIsSubmitting(false); }
    };

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    return (
        <section id="contato" className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-primary/10 rounded-full blur-[150px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                            {"// Contato"}
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                            Vamos transformar sua{" "} <span className="text-primary">ideia em realidade</span>
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                            Entre em contato conosco para discutir seu projeto. Estamos prontos para ajudar você a alcançar seus objetivos tecnológicos.
                        </p>

                        <div className="space-y-6">
                            <a href={`mailto:${COMPANY.email}`}
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300
                                    hover:border-primary/30 hover:bg-card/50 group" >

                                <div className="p-3 rounded-lg bg-primary/10 text-primary transition-all duration-300
                                        group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-foreground font-medium">{COMPANY.email}</p>
                                </div>
                            </a>

                            <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 
                                        hover:border-primary/30 hover:bg-card/50 group" >

                                <div className="p-3 rounded-lg bg-primary/10 text-primary transition-all duration-300
                                        group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Phone size={20} />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Telefone</p>
                                    <p className="text-foreground font-medium">{COMPANY.phone}</p>
                                </div>
                            </a>
                        </div>

                        <div className="mt-10 p-4 rounded-xl bg-background/50 border border-border/50 font-mono text-sm hidden md:block">
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/30">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                <span className="ml-2 text-muted-foreground text-xs"> terminal </span>
                            </div>

                            <div className="space-y-1 text-muted-foreground">
                                <p> <span className="text-primary">$</span> npm run start-project </p>
                                <p> <span className="text-cyan-400">→</span> Conectando com Vectoo... </p>
                                <p> <span className="text-green-400">✓</span> Pronto para inovar! </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className={cn("p-8 md:p-10 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500",
                            isSubmitted && "border-primary/30")} >

                        {isSubmitted 
                        ? 
                        (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2"> Mensagem enviada! </h3>
                                <p className="text-muted-foreground"> Entraremos em contato em breve. </p>
                            </div>
                        ) 
                        : 
                        (
                            <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground"> Nome </label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" required
                                        className="bg-background/50 border-border/50 focus:border-primary" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground"> Email </label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required
                                        className="bg-background/50 border-border/50 focus:border-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-foreground"> Assunto </label>
                                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Sobre o que gostaria de falar?" required
                                    className="bg-background/50 border-border/50 focus:border-primary" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground"> Mensagem </label>
                                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Conte-nos sobre seu projeto..." required
                                    className="bg-background/50 border-border/50 focus:border-primary resize-none" />
                            </div>

                                <Button type="submit" disabled={isSubmitting} className="w-full py-6 font-semibold" >
                                    {isSubmitting 
                                        ? ( <> <Loader2 className="mr-2 animate-spin" size={20} /> Enviando... </> ) 
                                        : ( <> Enviar mensagem <Send className="ml-2" size={18} /> </> )}
                                </Button>
                            </form>
                        )}

                            <div className="mt-6">
                                <a href={`https://wa.me/${COMPANY.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="block" >
                                    <Button type="button" variant="outline" className="w-full py-6 font-semibold" >
                                        <MessageCircle className="mr-2" /> Entrar em contato pelo WhatsApp
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-2xl -z-10" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary/10 rounded-2xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}