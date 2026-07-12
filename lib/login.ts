import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SignJWT, jwtVerify } from 'jose';

const jwtSecretKey = process.env.JWT_SECRET_KEY!;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const expirationSeconds = 86400;
const expirationString = '1d';
const cookieName = process.env.COOKIE_NAME!;

export async function getSession()
{
    const cookieStore = await cookies();
    const jwt = cookieStore.get(cookieName)?.value;
    if (!jwt) return false;
    return verifyJwt(jwt);
}

export async function createSession(username: string)
{
    const expiresAt = new Date(Date.now() + expirationSeconds * 1000);
    const loginSession = await signJwt({ username, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set(cookieName, loginSession, { httpOnly: true, secure: true, sameSite: 'strict', expires: expiresAt });
}

export async function deleteSession()
{
    const cookieStore = await cookies();
    cookieStore.set(cookieName, '', { expires: new Date(0) });
    cookieStore.delete(cookieName);
}

export async function verifySession()
{
    const jwtPayload = await getSession();
    if (!jwtPayload) return false;
    return jwtPayload?.username === process.env.LOGIN_USER;
}

export async function requireSessionOrRedirect()
{
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) redirect('/login');
}

export async function verifyJwt(jwt: string | undefined = '')
{
    try 
    {
        const { payload } = await jwtVerify(jwt, jwtEncodedKey, { algorithms: ['HS256'] });
        return payload;
    } 
    catch
    {
        console.log('Invalid Token');
        return false;
    }
}

export async function signJwt(jwtPayload: { username: string; expiresAt: Date; })
{
    return new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(expirationString)
        .sign(jwtEncodedKey);
}