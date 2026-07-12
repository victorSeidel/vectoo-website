"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

type MultiSelectProps =
{
    label?: string;
    name: string;
    options: string[];
    defaultValue?: string[];
    disabled?: boolean;
    full?: boolean;
};

export function Multiselect({ label, name, options, defaultValue = [], disabled, full}: MultiSelectProps)
{
    const [selected, setSelected] = useState(defaultValue);
    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        function handleClickOutside(event: MouseEvent) 
        {
            if (containerRef.current && !containerRef.current.contains(event.target as Node))
            {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    function toggleOption(option: string)
    {
        setSelected((prev) => prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]);
    }

    function removeOption(option: string)
    {
        setSelected((prev) => prev.filter((item) => item !== option));
    }

    return (
        <div ref={containerRef} className={`relative flex flex-col gap-2 ${full && 'w-full'}`}>
            {label && ( <label className="text-sm"> {label} </label> )}

            <button type="button" disabled={disabled} onClick={() => setOpen((prev) => !prev)}
                className="min-h-9 w-full rounded-md border border-input bg-transparent px-4 py-2 text-left flex flex-wrap items-center gap-2
                    disabled:pointer-events-none disabled:opacity-50">

                {selected.length > 0 
                ? 
                (
                    selected.map((item) => (
                        <span
                            key={item}
                            className="
                                flex items-center gap-1
                                rounded-md bg-primary/10
                                px-2 py-1 text-sm
                            "
                        >
                            {item}

                            <span
                                role="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(item);
                                }}
                            >
                                <X size={14} />
                            </span>
                        </span>
                    ))
                ) 
                :
                (
                    <span className="text-muted-foreground">
                        Selecione as opções...
                    </span>
                )}

                <ChevronDown size={16} className="ml-auto" />
            </button>


            {open && (
                <div
                    className="
                        absolute
                        top-full
                        left-0
                        z-50
                        mt-2
                        w-full
                        max-h-52
                        overflow-y-auto
                        rounded-md
                        border
                        bg-background
                        shadow-lg
                        p-2
                        grid grid-cols-3
                    "
                >
                    {options.map((option) => (
                        <label
                            key={option}
                            className="
                                flex items-center gap-2
                                rounded-md
                                px-2 py-2
                                cursor-pointer
                                hover:bg-muted
                            "
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() =>
                                    toggleOption(option)
                                }
                            />

                            <span>
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            {selected.map((tag) => (
                <input
                    key={tag}
                    type="hidden"
                    name={name}
                    value={tag}
                />
            ))}
        </div>
    );
}