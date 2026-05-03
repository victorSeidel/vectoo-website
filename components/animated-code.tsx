"use client";

import { useEffect, useState } from "react";

const codeLines = 
[
    { type: "comment", content: "// Transformando ideias em código" },
    { type: "keyword", content: "import", rest: " { innovation } from " },
    { type: "string", content: "'vectoo'" },
    { type: "newline", content: "" },
    { type: "keyword", content: "const", rest: " project = " },
    { type: "keyword", content: "await", rest: " vectoo." },
    { type: "function", content: "create" },
    { type: "bracket", content: "({" },
    { type: "property", content: "   tech:", value: " 'modern'," },
    { type: "property", content: "  quality:", value: " 'excellent'," },
    { type: "property", content: "  support:", value: " true" },
    { type: "bracket", content: "})" },
    { type: "newline", content: "" },
    { type: "comment", content: "// Ready to deploy! ✓" },
];

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
        {/* Window Controls */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/20">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">
            projeto.ts
          </span>
        </div>

        {/* Code Content */}
        <div className="font-mono text-sm space-y-1">
          {codeLines.slice(0, visibleLines).map((line, index) => (
            <div key={index} className="whitespace-pre font-mono">
              <span className="text-muted-foreground/40 w-6 text-right mr-4 select-none">
                {line.type !== "newline" ? index + 1 : ""}
              </span>
              {line.type === "comment" && (
                <span className="text-muted-foreground/60">{line.content}</span>
              )}
              {line.type === "keyword" && (
                <>
                  <span className="text-primary">{line.content}</span>
                  <span className="text-foreground">{line.rest}</span>
                </>
              )}
              {line.type === "string" && (
                <span className="text-green-400">{line.content}</span>
              )}
              {line.type === "function" && (
                <span className="text-yellow-400">{line.content}()</span>
              )}
              {line.type === "bracket" && (
                <span className="text-foreground/80">{line.content}</span>
              )}
              {line.type === "property" && (
                <>
                  <span className="text-cyan-400">{line.content}</span>
                  <span className="text-green-400">{line.value}</span>
                </>
              )}
              {line.type === "newline" && <span>&nbsp;</span>}
            </div>
          ))}
          {visibleLines < codeLines.length && (
            <div className="flex items-center">
              <span className="text-muted-foreground/40 w-6 text-right mr-4 select-none">
                {visibleLines + 1}
              </span>
              <span
                className={`w-2 h-4 bg-primary ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
              />
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
      </div>
    </div>
  );
}
