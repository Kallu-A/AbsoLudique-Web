import {fetcher} from "../../api";
import cookie from "cookie";

export default async function logincallback(req, res) {
    const query = req.query;

    let token = await query['token']

    const maxAge = 60 * 60 * 8
    const setCookie = cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      sameSite: 'strict',
      path: '/',
    });
    res.setHeader('Set-Cookie', setCookie);
    res.end()
}