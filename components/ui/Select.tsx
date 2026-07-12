import * as React from 'react';

import { cn } from '@/lib/utils';

function Select({ label = '', className, full = false, children, ...props }: { label?: string; full?: boolean } & React.ComponentProps<'select'>)
{
    return (
        <div className={`${full && 'w-full'} flex flex-col gap-2`}>
            {label && ( <label className='text-sm' > {label} </label> )}

            <select data-slot="input" {...props}
                className={cn(
                    "border-input file:text-foreground placeholder:text-base placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow]",
                    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            >
                {children}
            </select>
        </div>
    )
}

export { Select }