"use server";
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { verifySession } from '@/lib/session';

import { CreatePostDto, makePartialPost, Post, UpdatePostDto } from "@/models/post-model";
import { postRepository } from '@/repositories/post-repository';

type PostActionState = { formState: Post; errors: string[]; success?: string; };

export async function createPostAction(prevState: PostActionState, formData: FormData): Promise<PostActionState>
{
    if (!(formData instanceof FormData)) return { formState: prevState.formState, errors: ['Dados inválidos'] };
    const formDataToObj = Object.fromEntries(formData.entries());

    const isAuthenticated = await verifySession();
    if (!isAuthenticated) return { formState: makePartialPost(formDataToObj), errors: ['Usuário não autenticado'] };

    const validation = validatePost(formData);
    if (!validation.success) return { formState: makePartialPost(formDataToObj), errors: validation.errors };

    const validPostData = validation.data;
    const newPost: CreatePostDto = { ...validPostData };

    let post;
    try 
    {
        post = await postRepository.create(newPost);
    } 
    catch (e) 
    {
        if (e instanceof Error) return { formState: makePartialPost(newPost), errors: [e.message] };
        return { formState: makePartialPost(newPost), errors: ['Erro desconhecido'] };
    }

    revalidateTag('posts', 'max');
    redirect(`/blog/admin/post/${post.id}`);
}

export async function updatePostAction(prevState: PostActionState, formData: FormData): Promise<PostActionState>
{
    if (!(formData instanceof FormData)) return { formState: prevState.formState, errors: ['Dados inválidos'] };
    const formDataToObj = Object.fromEntries(formData.entries());

    const id = formData.get('id')?.toString() || '';
    console.log(id);
    if (!id || typeof id !== 'string') return { formState: makePartialPost(formDataToObj), errors: ['ID inválido'] };

    const isAuthenticated = await verifySession();
    if (!isAuthenticated) return { formState: makePartialPost(formDataToObj), errors: ['Usuário não autenticado'] };

    const validation = validatePost(formData);
    if (!validation.success) return { formState: makePartialPost(formDataToObj), errors: validation.errors };

    const validPostData = validation.data;
    const newPost: UpdatePostDto = { ...validPostData };

    let post;
    try
    {
        post = await postRepository.update(id, newPost);
    } 
    catch (e) 
    {
        if (e instanceof Error) return { formState: makePartialPost(newPost), errors: [e.message] };
        return { formState: makePartialPost(newPost), errors: ['Erro desconhecido'] };
    }

    revalidateTag('posts', 'max');
    revalidateTag(`post-${post.slug}`, 'max');
    return { formState: makePartialPost(post), errors: [], success: 'true' };
}

export async function deletePostAction(id: string)
{
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) return { error: 'Usuário não autenticado' };
    
    if (!id || typeof id !== 'string') return { error: 'ID inválido' };

    let post;
    try 
    {
        post = await postRepository.delete(id);
    } 
    catch (e: unknown) 
    {
        if (e instanceof Error) return { error: e.message };
        return { error: 'Erro desconhecido' };
    }

    revalidateTag('posts', 'max');
    revalidateTag(`post-${post.slug}`, 'max');
    return { error: '' };
}

function validatePost(formData: FormData): | { success: true; data: CreatePostDto; } | { success: false; errors: string[]; data: Record<string, unknown>; }
{
    const data =
    {
        category: String(formData.get('category') ?? '').trim(),
        tags: formData.getAll("tags").map(tag => String(tag).trim()).filter(Boolean),
        author: String(formData.get('author') ?? '').trim(),
        authorSocial: String(formData.get('authorSocial') ?? '').trim(),

        title: String(formData.get('title') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        excerpt: String(formData.get('excerpt') ?? '').trim(),
        coverImage: String(formData.get('coverImage') ?? '').trim(),

        published: ['on', 'true', true].includes(formData.get('published') as never),
        readTime: Number(formData.get('readTime') ?? 0)
    };

    const errors: string[] = [];

    if (data.category.length < 3) errors.push('Categoria é obrigatória');
    if (!data.tags) errors.push('Tags são obrigatórias');

    if (data.author.length < 3) errors.push('Autor precisa de um mínimo de 3 caracteres');
    if (data.author.length > 50) errors.push('Nome do autor não deve ter mais que 50 caracteres');

    if (data.title.length < 3) errors.push('Título deve ter, no mínimo, 3 caracteres');
    if (data.title.length > 100) errors.push('Título deve ter um máximo de 100 caracteres');

    if (data.excerpt.length < 3) errors.push('Excerto precisa de um mínimo de 3 caracteres');
    if (data.excerpt.length > 200) errors.push('Excerto não deve ter mais que 200 caracteres');

    if (data.content.length < 3) errors.push('Conteúdo é obrigatório');

    if (data.readTime <= 0) errors.push('Tempo de leitura deve ser maior que 0');

    if (errors.length > 0) return { success: false, errors, data };
    
    return { success: true, data };
}