import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    `cursor-pointer inline-flex justify-center items-center gap-2 shrink-0 whitespace-nowrap text-sm font-medium rounded-md outline-none transition-all duration-300
    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive`,

    {
        variants: 
        {
            variant: 
            {
                default: 'text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50',
                destructive: 'text-white bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20',
                outline: 'hover:text-white bg-transparent hover:bg-primary/5 border hover:border-primary/50 shadow-xs',
                secondary: 'text-secondary-foreground bg-secondary hover:bg-secondary/80',
                ghost:'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: 
            {
                default: 'h-9 py-4 px-4 text-base has-[>svg]:px-3',
                sm: 'h-8 py-3 px-4 text-sm rounded-md has-[>svg]:px-2.5',
                lg: 'h-10 py-6 px-8 text-base rounded-md has-[>svg]:px-4',
                icon: 'size-9', 'icon-sm': 'size-8', 'icon-lg': 'size-10',
            },
        },

        defaultVariants: { variant: 'default', size: 'default' },
    },
)

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean })
{
    const Comp = asChild ? Slot : 'button'
    return ( <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} /> )
}

export { Button, buttonVariants }