"use client";

import ErrorMessage from '@/components/ErrorMessage';

export default function ErrorPage()
{
    return (
        <div className="h-screen">
            <ErrorMessage
                pageTitle='Erro Interno do Servidor'
                contentTitle='500'
                content='Ocorreu um erro. Tente novamente mais tarde.'
            />
        </div>
    );
}