import cookie from "cookie";

export default async function logout(req, res) {
    const setCookie = cookie.serialize('jwt', 'logged out', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      sameSite: 'strict',
      path: '/',
    });
    res.setHeader('Set-Cookie', setCookie)
    res.end()
}