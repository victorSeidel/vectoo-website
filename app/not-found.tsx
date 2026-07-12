import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Página Não Encontrada', description: 'A página que você procura não foi encontrada.' };

import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage()
{
    return (
        <div className="h-screen">
            <ErrorMessage
                contentTitle='404'
                content='A página que você está tentando acessar não foi encontrada'
            />
        </div>
    );
}