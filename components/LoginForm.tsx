"use client";
import { useActionState } from 'react';

import { loginAction } from '@/actions/login-actions';

import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';

export function LoginForm()
{
    const [state, action, isPending] = useActionState(loginAction, { username: '', error: '' });

    return (
        <div>
            <form action={action} className='flex-1 flex flex-col gap-6'>
                <Input type='text' name='username' label='Usuário' placeholder='Seu usuário' disabled={isPending} defaultValue={state.username} />
                <Input type='password' name='password' label='Senha' placeholder='Sua senha' disabled={isPending} defaultValue={state.username} />
                <Button type='submit' disabled={isPending}> Entrar </Button>

                {!!state.error && <p className='text-red-500'> {state.error} </p> }
            </form>
        </div>
    )
}