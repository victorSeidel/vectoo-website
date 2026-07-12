"use client";
import { useActionState } from "react";

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
        <div className="flex flex-col justify-center items-center gap-8" >
            <h1 className="text-lg">
                {title}
            </h1>

            <form action={action} className="w-4xl max-w-4xl flex flex-col gap-6" >
                <div className="flex gap-4" hidden >
                    <Input label='ID' name='id' placeholder='ID gerado automaticamente' type='text' defaultValue={formState.id} disabled={isPending} readOnly full />
                    <Input label='Slug' name='slug' placeholder='Slug gerada automaticamente' type='text' defaultValue={formState.slug} disabled={isPending} readOnly full />
                </div>

                <div className="flex gap-4" >
                    <Input label='Autor' name='author' placeholder='Digite o nome do autor' type='text' defaultValue={formState.author} disabled={isPending} full />
                    <Input label='Título' name='title' placeholder='Digite o título' type='text' defaultValue={formState.title} disabled={isPending} full />
                </div>

                <div className="flex gap-4" >
                    <Input label='Categoria' name='category' placeholder='Categoria principal' type='text' defaultValue={formState.category} disabled={isPending} full />
                    <Multiselect label='Tags' name='tags' options={POST_CATEGORIES} defaultValue={formState.tags} disabled={isPending} full />
                </div>

                <Textarea label='Excerto' name='excerpt' placeholder='Digite o resumo' rows={3} defaultValue={formState.excerpt} disabled={isPending} />
                <Textarea label='Conteúdo' name='content' placeholder='Digite o conteúdo' rows={10} defaultValue={formState.content} disabled={isPending} />

                <div className="flex gap-4" >
                    <Input label='Imagem de Capa' name='coverImage' placeholder='Digite a url' type='text' defaultValue={formState.coverImage} disabled={isPending} full />
                    <div className="flex gap-4" >
                        <Input label='Tempo de Leitura' name='readTime' type='number' defaultValue={formState.readTime} disabled={isPending} full />
                        <Input label='Publicar?' name='published' type='checkbox' defaultChecked={formState.published} disabled={isPending} />
                    </div>
                </div>

                <div className="flex gap-4" >
                    <Button disabled={isPending} variant="destructive" className="flex-1" onClick={handleDelete} > Excluir </Button>
                    <Button disabled={isPending} type="submit" className="flex-1" > Salvar </Button>
                </div>

                {!!state.errors && <p className='text-red-500'> {state.errors[0]} </p> }
            </form>
        </div>
    );
}