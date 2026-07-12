import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ label = '', className, ...props }: { label?: string; } & React.ComponentProps<'textarea'>)
{
    return (
        <div className='flex flex-col gap-2'>
            {label && ( <label className='text-sm' > {label} </label> )}

            <textarea data-slot="textarea" {...props}
                className={cn(`border-input placeholder:text-base placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20
                    aria-invalid:border-destructive flex min-h-16 w-full rounded-md border
                    bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed
                    disabled:opacity-50`,
                    className,
                )}
            />
        </div>
    )
}

export { Textarea }