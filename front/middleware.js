import {NextResponse} from 'next/server'
import {verifyAuth} from "./lib/auth";

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const protectedPaths = ["/", "/armoire", "/ajout/jeu"];
    const isPathProtected = protectedPaths?.some((path) => pathname === path);
    if (isPathProtected) {
        const token = req.cookies.get('jwt')
        let verifiedToken = null
        if (token !== undefined && token !== null)
            if (token['value'] !== undefined && token['value'] !== null)
                verifiedToken = await verifyAuth(token).catch((err) => {
                    console.error("Token invalid", err.message)
                })
        if (!verifiedToken) {
            const url = new URL(`/login`, req.url);
           // url.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(url);
        }
    }


    return NextResponse.next()
}