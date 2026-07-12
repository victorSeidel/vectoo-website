"use client";
import { useActionState } from "react";
import Link from "next/link";

import { makePartialPost, Post } from "@/models/post-model";
import { POST_CATEGORIES } from "@/lib/constants";
import { createPostAction, deletePostAction, updatePostAction } from "@/actions/post-actions";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Multiselect } from "@/components/UI/Multiselect";
import { Textarea } from "@/components/UI/Textarea";

type PostFormCreateProps = { mode: 'create'; };
type PostFormUpdateProps = { mode: 'update'; post: Post; };
type PostFormProps = | PostFormUpdateProps | PostFormCreateProps;

export function PostForm(props: { title: string } & PostFormProps)
{
    const { title, mode } = props;
    const post = mode === 'update' ? props.post : undefined;

    const actionsMap = { update: updatePostAction, create: createPostAction };
    const initialState = { formState: makePartialPost(post), errors: [] };
    const [state, action, isPending] = useActionState(actionsMap[mode], initialState);

    const { formState } = state;

    async function handleDelete()
    {
        if (!post || !confirm("Tem certeza que deseja excluir?")) return;
        await deletePostAction(post.id);
    }

    return (
        <div className="container flex flex-col justify-center items-center gap-8 py-8" >
            <div className="w-full flex justify-between items-center" >
                <h1 className="text-xl"> {title}</h1>
                <Button asChild variant="outline" >
                    <Link href='/admin/posts' > Voltar </Link>
                </Button>
            </div>

            <form action={action} className="w-full flex flex-col gap-8" >
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4" hidden >
                            <Input label='ID' name='id' defaultValue={formState.id} disabled={isPending} readOnly full />
                            <Input label='Slug' name='slug' defaultValue={formState.slug} disabled={isPending} readOnly full />
                        </div>

                        <Input label='Título' name='title' placeholder='Digite o título' defaultValue={formState.title} disabled={isPending} required full />

                        <Input label='Autor' name='author' placeholder='Digite o nome' defaultValue={formState.author} disabled={isPending} required full />
                        <Input label='Rede Social do Autor' name='authorSocial' placeholder='Cole o link' defaultValue={formState.authorSocial} disabled={isPending} full />

                        <Input label='Categoria' name='category' placeholder='Categoria principal' defaultValue={formState.category} disabled={isPending} required full />
                        <Multiselect label='Tags' name='tags' options={POST_CATEGORIES} defaultValue={formState.tags} disabled={isPending} full />

                        <Input label='Imagem de Capa' name='coverImage' placeholder='Cole a url' defaultValue={formState.coverImage} disabled={isPending} full />

                        <div className="flex gap-4" >
                            <Input label='Tempo de Leitura' name='readTime' type='number' defaultValue={formState.readTime} disabled={isPending} full />
                            <Input label='Publicar?' name='published' type='checkbox' defaultChecked={formState.published} disabled={isPending} />
                        </div>

                        <div className="flex gap-4 mt-6" >
                            <Button disabled={isPending} variant="destructive" className="flex-1" onClick={handleDelete} > Excluir </Button>
                            <Button disabled={isPending} type="submit" className="flex-1" > Salvar </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Textarea label='Excerto' name='excerpt' placeholder='Digite o resumo' rows={3} defaultValue={formState.excerpt} disabled={isPending} />
                        <Textarea label='Conteúdo' name='content' placeholder='Digite o conteúdo' rows={20} defaultValue={formState.content} disabled={isPending} />
                    </div>
                </div>

                {!!state.errors && <p className='text-red-500'> {state.errors[0]} </p> }
            </form>
        </div>
    );
}