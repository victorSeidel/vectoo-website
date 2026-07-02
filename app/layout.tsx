import React from "react";
import type { Metadata } from 'next';

import '@/app/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains' });

export const metadata: Metadata = 
{
    title: 'Vectoo | Soluções em Tecnologia',
    description: 'Desenvolvimento de sites, sistemas, bots, CRMs e consultoria especializada em tecnologia. Transformamos ideias em soluções digitais inovadoras.',
    keywords: ['desenvolvimento web', 'sistemas', 'consultoria tecnologia', 'CRM', 'bots', 'segurança digital'],
    authors: [{ name: 'Vectoo' }],
    creator: 'Vectoo',
    openGraph: 
    {
        type: 'website',
        locale: 'pt_BR',
        title: 'Vectoo | Soluções em Tecnologia',
        description: 'Transformamos ideias em soluções digitais inovadoras.',
        siteName: 'Vectoo',
    },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
    return (
        <html lang="pt-BR" className="scroll-smooth">
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    )
}