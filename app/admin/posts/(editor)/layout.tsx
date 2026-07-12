export default async function PostsEditorLayout({ children }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            {children}
        </div>
    );
}