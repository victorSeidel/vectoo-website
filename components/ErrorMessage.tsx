export default function ErrorMessage({ pageTitle = undefined, contentTitle, content }: { pageTitle?: string; contentTitle: string; content: React.ReactNode; })
{
    return (
        <>
            {pageTitle && <title> {pageTitle} </title> }

            <div className="h-full flex justify-center items-center mb-16 p-8 text-center text-slate-100 bg-background">
                <div>
                    <h1 className="mb-4 text-7xl/tight text-primary font-extrabold"> {contentTitle} </h1>
                    <div className="text-xl"> {content} </div>
                </div>
            </div>
        </>
    );
}