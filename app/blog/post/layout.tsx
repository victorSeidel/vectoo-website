export default function PostLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
    return (
        <div className="w-full min-h-screen p-8 bg-white">
            <article className="w-6xl h-full flex flex-col items-start mx-auto">
                {children}
            </article>
        </div>
    )
}