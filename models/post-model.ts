export type Post =
{
    id: string;
    slug: string;

    category: string;
    tags: string[];
    author: string;
    authorSocial: string;

    title: string;
    excerpt: string;
    content: string;
    coverImage: string;

    published: boolean;
    readTime: number;

    createdAt: Date;
    updatedAt: Date;
};

export type CreatePostDto = Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">;
export type UpdatePostDto = Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">;

export type ResponsePostDto = Omit<Post, "published">;

export const makePartialPost = (post?: Partial<Post>): Post =>
{
    return {
        id: post?.id || '',
        slug: post?.slug || '',

        category: post?.category || '',
        tags: post?.tags || [],
        author: post?.author || '',
        authorSocial: post?.authorSocial || '',

        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        coverImage: post?.coverImage || '',

        published: post?.published || false,
        readTime: post?.readTime || 0,

        createdAt: post?.createdAt || new Date(),
        updatedAt: post?.updatedAt || new Date()
    };
};