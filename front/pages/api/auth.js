import cookie from 'cookie';
import {fetcher} from "../../api";

export default async function login(req, res) {
  if (req.method !== 'POST') {
    res.status(401).json({message: "Unauthorized"})
  }

  try {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODExNzMxOCwianRpIjoiNmU3ZDk5ODYtZTcxMi00MDYzLTg3YzAtYTFlNDE0YWJhMTkxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEwNzk4MjQyODkwMzExMDIxMDYyMCIsIm5iZiI6MTY3ODExNzMxOCwiZXhwIjoxNjc4MTQ2MTE4fQ.xoF3M0JgjXepmqJwc04R8NSzVhO5uAI1cvW-ZqGFtBc'
    // TODO to change !!!!
    let redirect_callback = "?redirect_callback=" + "https://localhost:3000"
    const resp = await fetcher("login" + redirect_callback)
    console.log(resp)

    const maxAge = 60 * 60 * 8
    const setCookie = cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      sameSite: 'strict',
      path: '/',
    });

    res.setHeader('Set-Cookie', setCookie);
  } catch (err) {
    console.error(err)
    res.status(401).json({message: "Unauthorized"})
  }
  res.end()

}