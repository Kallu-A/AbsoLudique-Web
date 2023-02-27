import { NextResponse } from 'next/server'

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/", "/armoire", "ajout/jeu"];
  const isPathProtected = protectedPaths?.some((path) => pathname === path);
  const res = NextResponse.next();

  if (isPathProtected) {
    //const token = await getToken({ req });
    const token = null
    if (!token) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}