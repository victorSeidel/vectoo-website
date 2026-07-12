import { Fragment } from "react";

interface MarkdownNode { type: string; content?: string; level?: number; ordered?: boolean; children?: MarkdownNode[]; }

const escapeHTML = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function parseMarkdown(markdown: string): MarkdownNode[]
{
    const lines = markdown.replace(/\r/g, "").split("\n");
    const nodes: MarkdownNode[] = [];
    let i = 0;

    while (i < lines.length) 
    {
        const line = lines[i].trimStart();

        if (!line.trim()) 
        {
            i++;
            continue;
        }

        // heading
        
        const heading = /^\s*(#{1,6})\s*(.+)$/.exec(line);

        if (heading)
        {
            nodes.push({ type: "heading", level: heading[1].length, content: heading[2] });
            i++;
            continue;
        }

        // code block

        if (line.startsWith("```"))
        {
            i++;
            let code = "";

            while (i < lines.length && !lines[i].startsWith("```"))
            {
                code += lines[i] + "\n";
                i++;
            }

            i++;
            nodes.push({ type: "code", content: code.trimEnd() });
            continue;
        }

        // quote

        if (line.startsWith("> "))
        {
            let quote = "";

            while (i < lines.length && lines[i].startsWith("> "))
            {
                quote += lines[i].slice(2) + "\n";
                i++;
            }

            nodes.push({ type: "quote", content: quote.trim() });
            continue;
        }

        // unordered list

        if (/^[-*+]\s/.test(line)) 
        {
            const children: MarkdownNode[] = [];

            while (i < lines.length && /^[-*+]\s/.test(lines[i]))
            {
                children.push({ type: "list-item", content: lines[i].substring(2) });
                i++;
            }

            nodes.push({ type: "list", ordered: false, children });
            continue;
        }

        // ordered list

        if (/^\d+\.\s/.test(line))
        {
            const children: MarkdownNode[] = [];

            while (i < lines.length && /^\d+\.\s/.test(lines[i]))
            {
                children.push({ type: "list-item", content: lines[i].replace(/^\d+\.\s/, "") });
                i++;
            }

            nodes.push({ type: "list", ordered: true, children });
            continue;
        }

        // horizontal rule

        if (/^---+$/.test(line))
        {
            nodes.push({ type: "hr" });
            i++;
            continue;
        }

        // paragraph

        let paragraph = line;
        i++;

        while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith(">") && !lines[i].startsWith("```")
            && !/^[-*+]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]))
        {
            paragraph += "\n" + lines[i];
            i++;
        }

        nodes.push({ type: "paragraph", content: paragraph });
    }

    return nodes;
}

function inline(text: string)
{
    let html = escapeHTML(text);
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return html;
}

const tagClasses =
{
    1: "text-4xl font-extrabold mt-10 mb-8",
    2: "text-3xl font-bold mt-10 mb-6",
    3: "text-2xl font-semibold mt-8 mb-4",
    4: "text-xl font-medium mt-6 mb-4",
    5: "text-lg font-medium mt-4 mb-2",
    6: "text-base font-normal mt-4 mb-2",
};

function renderMarkdown(nodes: MarkdownNode[]) 
{
    return nodes.map((node, index) => 
    {
        switch (node.type) 
        {
            case "heading":
                const Tag = `h${node.level}` as React.ElementType;
                return ( <Tag key={index} dangerouslySetInnerHTML={{  __html: inline(node.content!) }} className={tagClasses[node.level as keyof typeof tagClasses]} /> );

            case "paragraph":
                return ( <p key={index} dangerouslySetInnerHTML={{  __html: inline(node.content!) }} className="mb-4" /> );

            case "quote":
                return ( <blockquote key={index} dangerouslySetInnerHTML={{ __html: inline(node.content!) }} /> );

            case "code":
                return (
                    <pre key={index}>
                        <code>{node.content}</code>
                    </pre>
                );

            case "hr":
                return <hr key={index} />;

            case "list":
                const List = node.ordered ? "ol" : "ul";
                return (
                    <List key={index}>
                        {node.children?.map((child, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: inline(child.content!) }} />
                        ))}
                    </List>
                );

            default:
                return <Fragment key={index} />;
        }
    });
}

export const markdown = (text: string) => renderMarkdown(parseMarkdown(text));