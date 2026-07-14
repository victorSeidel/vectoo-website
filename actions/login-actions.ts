"use server";
import { redirect } from 'next/navigation';

import { createSession, deleteSession } from '@/lib/session';
import { verifyPassword } from '@/lib/password';

export async function loginAction(state: { username: string; error: string; }, formData: FormData)
{
    if (!(formData instanceof FormData)) return { username: '', error: 'Dados inválidos' };

    const username = formData.get('username')?.toString().trim() || '';
    const password = formData.get('password')?.toString().trim() || '';

    if (!username || !password) return { username: '', error: 'Dados obrigatórios faltando' };

    const isUsernameValid = username === process.env.LOGIN_USER;
    const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASS || '');

    if (!isUsernameValid || !isPasswordValid) return { username: '', error: 'Credenciais inválidas' };

    await createSession(username);
    redirect('/admin');
}

export async function logoutAction()
{
    await deleteSession();
    redirect('/login');
}