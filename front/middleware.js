import {NextResponse} from 'next/server'
import {verifyAuth} from "./lib/auth";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/", "/armoire", "ajout/jeu"];
  const isPathProtected = protectedPaths?.some((path) => pathname === path);
  const res = NextResponse.next();

  if (isPathProtected) {
      const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message)
    })

    if (!verifiedToken) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}