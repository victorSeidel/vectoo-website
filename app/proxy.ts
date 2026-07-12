import { NextRequest, NextResponse } from 'next/server';

import { verifyJwt } from '@/lib/login';

export async function proxy(request: NextRequest)
{
    const jwtSession = request.cookies.get(process.env.COOKIE_NAME!)?.value;
    if (!jwtSession) return NextResponse.redirect(new URL('/login', request.url));

    const isAuthenticated = await verifyJwt(jwtSession);
    if (!isAuthenticated) return NextResponse.redirect(new URL('/login', request.url));

    return NextResponse.next();
}

export const config =
{
    matcher: '/admin/:path*',
};