"use client";
import { useEffect, useState } from "react";

export function ReadingProgress()
{
    const [progress, setProgress] = useState(0);

    useEffect(() => 
    {
        function onScroll()
        {
            const el = document.documentElement;
            const scrollTop = el.scrollTop;
            const height = el.scrollHeight - el.clientHeight;
            setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
        }

        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () =>
        {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
            <div
                className="h-full bg-primary transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(98,222,99,0.6)]"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-label="Progresso de leitura"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
            />
        </div>
    );
}