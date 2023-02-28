import {NextResponse} from 'next/server'
import {verifyAuth} from "./lib/auth";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/", "/armoire", "ajout/jeu"];
  const isPathProtected = protectedPaths?.some((path) => pathname === path);
  if (isPathProtected) {

    const token = req.cookies.get('jwt')['value']
    const verifiedToken = await verifyAuth(token).catch((err) => {
    console.error("Token invalid", err.message)
    })
    console.log("middleware " + token)
    console.log("middleware " + verifiedToken)

    if (!verifiedToken) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    console.log('is authentified')
  }


  return NextResponse.next()
}
/*
import cookie from 'cookie';
import {NextResponse} from "next/server";

export const withAuth = (handler) => async (req, res) => {
  const pathname = req.nextUrl.pathname;
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.jwt;

  console.log(cookies)


  //const user = verifyToken(token); // Utilisez votre propre fonction de vérification de jeton JWT
  const user = token
  if (!user) {
    const url = new URL(`/login`, req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }


  return handler(req, res);
};*/