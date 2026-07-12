import { Metadata } from 'next';
export const metadata: Metadata = { title: { default: 'Painel | Admin Vectoo', template: '%s | Admin Vectoo' } };

import { requireSessionOrRedirect } from "@/lib/session";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>)
{
    await requireSessionOrRedirect();

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            {children}
        </div>
    );
}