import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Painel Administrativo | Vectoo', robots: { index: false, follow: false, nocache: true } };

import { requireSessionOrRedirect } from "@/lib/login";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>)
{
    await requireSessionOrRedirect();

    return (
        <>
            {children}
        </>
    );
}