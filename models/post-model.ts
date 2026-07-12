export type Post =
{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    tags: string[];
    author: string;
    content: string;
    coverImage: string;
    published: boolean;
    readTime: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreatePostDto = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type UpdatePostDto = Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">;

export type ResponsePostDto = Omit<Post, "published">;

export const makePartialPost = (post?: Partial<Post>): Post =>
{
    return {
        id: post?.id || '',
        slug: post?.slug || '',
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        category: post?.category || '',
        tags: post?.tags || [],
        author: post?.author || '',
        content: post?.content || '',
        coverImage: post?.coverImage || '',
        published: post?.published || false,
        readTime: post?.readTime || 0,
        createdAt: post?.createdAt || new Date(),
        updatedAt: post?.updatedAt || new Date()
    };
};