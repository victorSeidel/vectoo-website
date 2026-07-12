import Link from 'next/link';

import { logoutAction } from '@/actions/login-actions';

import { Button } from '@/components/UI/Button';

export default async function AdminPage()
{
    return (
        <div>
            ADMIN PANEL

            <div className="space-x-2">
                <Button variant="destructive" onClick={logoutAction} >
                    Logout
                </Button>
                <Button asChild >
                    <Link href='/admin/posts' > Lista de Posts </Link>
                </Button>
            </div>
        </div>
    )
}