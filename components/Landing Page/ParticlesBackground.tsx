"use client";
import { useEffect, useRef } from "react";

export function ParticlesBackground({ className = "" }: { className?: string; })
{
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() =>
    {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resizeCanvas = () => 
        {
            const parent = canvas.parentElement;
            if (!parent) return;

            width = parent.clientWidth;
            height = parent.clientHeight;

            canvas.width = width * 1;
            canvas.height = height * 1;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        };

        resizeCanvas();

        const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; }[] = [];

        for (let i = 0; i < 50; i++) 
        {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        let animationId: number;
        let isVisible = true;

        const animate = () =>
        {
            animationId = requestAnimationFrame(animate);

            if (!isVisible) return;

            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) =>
            {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(98,222,99,${p.opacity})`;
                ctx.fill();
            });

            const maxDist = 150;
            const maxDistSq = maxDist * maxDist;

            for (let i = 0; i < particles.length; i++)
            {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++)
                {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq)
                    {
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(98,222,99,${0.1 * (1 - dist / maxDist)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const resizeObserver = new ResizeObserver(resizeCanvas);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        const intersectionObserver = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
        intersectionObserver.observe(canvas);

        animate();

        return () =>
        {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />
    );
}