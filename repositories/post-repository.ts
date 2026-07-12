import { db } from "@/db/postgres";

import { CreatePostDto, Post, ResponsePostDto, UpdatePostDto } from "@/models/post-model";

export class PostRepository
{
    async findAll(): Promise<Post[]>
    {
        const result = await db.query(`SELECT * FROM posts ORDER BY created_at DESC`);
        return result.rows.map(mapPost);
    }

    async findAllPublic(): Promise<Post[]>
    {
        const result = await db.query(`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`);
        return result.rows.map(mapPost);
    }

    async findById(id: string): Promise<Post> 
    {
        const result = await db.query(`SELECT * FROM posts WHERE id = $1`, [id]);
        if (!result.rowCount) throw new Error('Post não encontrado');
        return mapPost(result.rows[0]);
    }

    async findBySlugPublic(slug: string): Promise<Post>
    {
        const result = await db.query(`SELECT * FROM posts WHERE slug = $1 AND published = true`, [slug]);
        if (!result.rowCount) throw new Error('Post não encontrado');
        return mapPost(result.rows[0]);
    }

    async create(post: CreatePostDto): Promise<ResponsePostDto>
    {
        const exists = await db.query(`SELECT id FROM posts WHERE slug = $1`, [post.slug]);
        if (exists.rowCount) throw new Error('Post já existe');

        const createdAt = new Date();
        const updatedAt = new Date();

        const result = await db.query(`INSERT INTO posts (slug, title, category, tags, content, author, excerpt, cover_image, published, read_time, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [post.slug, post.title, post.category, post.tags, post.content, post.author, post.excerpt, post.coverImage, post.published, post.readTime, createdAt, updatedAt]);

        return { ...post, id: result.rows[0].id, createdAt, updatedAt };
    }

    async update(id: string, data: UpdatePostDto): Promise<ResponsePostDto>
    {
        const oldPost = await this.findById(id);

        const updatedAt = new Date();

        await db.query(`UPDATE posts SET title = $1, category = $2, tags = $3, content = $4, author = $5, excerpt = $6, cover_image = $7, published = $8, read_time = $9,
            updated_at = $10 WHERE id = $11`,
            [data.title, data.category, data.tags, data.content, data.author, data.excerpt, data.coverImage, data.published, data.readTime, updatedAt, id]);

        return { ...oldPost, ...data, updatedAt };
    }

    async delete(id: string): Promise<Post>
    {
        const post = await this.findById(id);
        await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
        return post;
    }
}

function mapPost(row: any): Post
{
    return {
        id: row.id,
        slug: row.slug,
        category: row.category,
        tags: row.tags,
        title: row.title,
        content: row.content,
        author: row.author,
        excerpt: row.excerpt,
        coverImage: row.cover_image,
        published: row.published,
        readTime: row.read_time,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export const postRepository: PostRepository = new PostRepository();