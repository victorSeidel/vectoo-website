import { cn } from "@/lib/utils";
import { markdown } from "@/lib/markdown";

export function Markdown({ children, className = '' }: { children: React.ReactNode; className?: string; })
{
    const text = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
              
    return (
        <div className={cn("max-w-none prose", className)} >
            {markdown(text)}
        </div>
    );
}