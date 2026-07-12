import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Login', description: 'Faça login para acessar os conteúdos da página.' };

import { LoginForm } from '@/components/LoginForm';

export default async function LoginPage()
{
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <LoginForm />
        </div>
    )
}