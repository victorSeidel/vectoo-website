import { db } from "@/database/postgres";

import { CreatePostDto, Post, ResponsePostDto, UpdatePostDto } from "@/models/post-model";
import { makeSlugFromText } from "@/utils/text";

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

    async findRelated(id: string): Promise<Post[]>
    {
        const current = await this.findById(id);

        const related = await db.query(`SELECT p.*,
            (CASE WHEN p.category = $2 THEN 5 ELSE 0 END + (SELECT COUNT(*) FROM unnest(p.tags) AS tag WHERE tag = ANY($3::text[])) * 2) AS score
            FROM posts p WHERE p.id <> $1 AND p.published = true ORDER BY score DESC, p.created_at DESC LIMIT 6`, [id, current.category, current.tags]
        );

        const rows = related.rows.filter(post => post.score > 0);
        if (rows.length > 0) return rows.map(mapPost);

        const recent = await db.query(`SELECT * FROM posts WHERE id <> $1 AND published = true ORDER BY created_at DESC LIMIT 6`, [id]);
        return recent.rows.map(mapPost);
    }

    async create(post: CreatePostDto): Promise<ResponsePostDto>
    {
        const slug = makeSlugFromText(post.title);

        const exists = await db.query(`SELECT id FROM posts WHERE slug = $1`, [slug]);
        if (exists.rowCount) throw new Error('Post com essa slug já existe');

        const result = await db.query(
            `INSERT INTO posts (slug, category, tags, author, author_social, title, excerpt, content, cover_image, published, read_time)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [slug, post.category, post.tags, post.author, post.authorSocial, post.title, post.excerpt, post.content, post.coverImage, post.published, post.readTime]);

        return { ...post, id: result.rows[0].id, slug, createdAt: new Date(), updatedAt: new Date() };
    }

    async update(id: string, data: UpdatePostDto): Promise<ResponsePostDto>
    {
        const old = await this.findById(id);
        const slug = data.title ? makeSlugFromText(data.title) : old.slug;
        const updatedAt = new Date();

        await db.query(
            `UPDATE posts SET slug = $1, category = $2, tags = $3, author = $4, author_social = $5, title = $6, excerpt = $7, content = $8, cover_image = $9,
                published = $10, read_time = $11, updated_at = $12 WHERE id = $13`,
            [slug, data.category, data.tags, data.author, data.authorSocial, data.title, data.excerpt, data.content, data.coverImage,
                data.published, data.readTime, updatedAt, id]);

        return { ...old, ...data, slug, updatedAt };
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
        author: row.author,
        authorSocial: row.author_social,

        title: row.title,
        content: row.content,
        excerpt: row.excerpt,
        coverImage: row.cover_image,

        published: row.published,
        readTime: row.read_time,

        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export const postRepository: PostRepository = new PostRepository();