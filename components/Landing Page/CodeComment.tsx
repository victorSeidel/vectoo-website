import { cn } from '@/lib/utils';

export function CodeComment({ text, className = '' }: { text: string, className?: string })
{
    return (
        <span className={cn("block mb-4 text-sm text-primary font-mono uppercase tracking-wider", className)}>
            {`// ${text}`}
        </span>
    )
}