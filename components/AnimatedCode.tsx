"use client";
import { useEffect, useState } from "react";

type TokenType = | "keyword" | "string" | "property" | "function" | "comment" | "boolean" | "text";
type Token = { type: TokenType; content: string; };

const codeLines: Token[][] = 
[
    [
        { type: "keyword", content: "import" },
        { type: "text", content: " { vectoo } from " },
        { type: "string", content: "'vectoo'" },
        { type: "text", content: ";" },
    ],

    [],

    [
        { type: "keyword", content: "const" },
        { type: "text", content: " projeto = " },
        { type: "keyword", content: "await" },
        { type: "text", content: " vectoo." },
        { type: "function", content: "create" },
        { type: "text", content: "({" },
    ],

    [
        { type: "property", content: "    tecnologia" },
        { type: "text", content: ": " },
        { type: "string", content: "'moderna'" },
        { type: "text", content: "," },
    ],

    [
        { type: "property", content: "    qualidade" },
        { type: "text", content: ": " },
        { type: "string", content: "'excelente'" },
        { type: "text", content: "," },
    ],

    [
        { type: "property", content: "    suporte" },
        { type: "text", content: ": " },
        { type: "boolean", content: "true" },
    ],

    [
        { type: "text", content: "});" },
    ],

    [],

    [
        { type: "comment", content: "// Pronto para deploy!" },
    ],
];

const colors = 
{
    keyword: "text-primary",
    string: "text-green-400",
    property: "text-cyan-400",
    function: "text-yellow-400",
    comment: "text-muted-foreground/60",
    boolean: "text-orange-400",
    text: "text-foreground",
};

export function AnimatedCode() 
{
    const [visibleLines, setVisibleLines] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => 
    {
        const lineInterval = setInterval(() => 
        {
            setVisibleLines((prev) => 
            {
                if (prev >= codeLines.length) 
                {
                    clearInterval(lineInterval);
                    return prev;
                }

                return prev + 1;
            });
        }, 300);

        return () => clearInterval(lineInterval);
    }, []);

    useEffect(() => 
    {
        const cursorInterval = setInterval(() => { setCursorVisible((prev) => !prev); }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 w-100">
            <div className="relative p-6 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/20">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono"> projeto.ts </span>
                </div>

                <div className="font-mono text-sm space-y-1">
                    {codeLines.slice(0, visibleLines).map((line, index) => (
                        <div key={index} className="grid grid-cols-[2rem_1fr] whitespace-pre">
                            <span className="text-right text-muted-foreground/40 mr-4">
                                {index + 1}
                            </span>

                            <span>
                                {line.map((token, i) => (
                                    <span key={i} className={colors[token.type]}>
                                        {token.content}
                                    </span>
                                ))}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
            </div>
        </div>
    );
}
