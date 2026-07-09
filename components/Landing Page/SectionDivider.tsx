"use client";
import { useEffect, useRef } from "react";

interface SectionDividerProps { variant?: "dots" | "code" | "wave"; }

export function SectionDivider({ variant = "dots" }: SectionDividerProps) 
{
    if (variant === "code")
    {
        return (
            <div className="py-8 flex items-center justify-center overflow-hidden">
                <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground/40">
                    <span className="w-16 h-px bg-linear-to-r from-transparent to-primary/20" />
                    <code>{"<section>"}</code>
                    <span className="w-32 h-px bg-primary/20" />
                    <code>{"</section>"}</code>
                    <span className="w-16 h-px bg-linear-to-l from-transparent to-primary/20" />
                </div>
            </div>
        );
    }

    if (variant === "wave")
    {
        return (
            <div className="py-4 overflow-hidden">
                <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-10" >
                    <path d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20" fill="none" stroke="url(#waveGradient)" strokeWidth="1" className="opacity-30" />

                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#62DE63" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (variant === "dots")
    {
        const canvasRef = useRef<HTMLCanvasElement>(null);

        useEffect(() => 
        {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const resizeCanvas = () =>
            {
                canvas.width = canvas.offsetWidth * window.devicePixelRatio;
                canvas.height = canvas.offsetHeight * window.devicePixelRatio;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            };

            resizeCanvas();

            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            const dotSpacing = 30;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            for (let x = 0; x < width; x += dotSpacing) 
            {
                const distFromCenter = Math.abs(x - width / 2);
                const maxDist = width / 2;
                const opacity = 0.1 + (1 - distFromCenter / maxDist) * 0.3;
                const size = 1 + (1 - distFromCenter / maxDist) * 2;

                ctx.beginPath();
                ctx.arc(x, centerY, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(98, 222, 99, ${opacity})`;
                ctx.fill();
            }

            window.addEventListener("resize", resizeCanvas);
            return () => window.removeEventListener("resize", resizeCanvas);
        }, [variant]);

        return (
            <div className="py-6">
                <canvas ref={canvasRef} className="w-full h-4" />
            </div>
        );
    }
}
