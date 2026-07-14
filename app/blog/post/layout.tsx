import React from "react";

import { Footer } from '@/components/Landing Page/Sections/Footer';
import { Header } from '@/components/Landing Page/Sections/Header';
import { ReadingProgress } from '@/components/Posts/ReadingProgress';

export default function PostLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
    return (
        <>
            <Header />
            <ReadingProgress />

            <main>
                {children}
            </main>

            <Footer />
        </>
    )
}