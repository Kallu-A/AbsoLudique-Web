import {NextResponse} from "next/server";
import {USER_TOKEN} from "../../lib/constant";
import cookie from 'cookie';


/*
function jsonResponse(status, data, init) {
  return new NextResponse(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  })
}
*/
export default async function login(req, res) {
  console.log("login")
  if (req.method !== 'POST') {
    console.log("methods not post")
    res.status(401).json({message: "Unauthorized"})
  }

  try {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NzYyNzMwMCwianRpIjoiM2Y0YjhhYWEtZmU5Ni00OWEzLTk3ZmYtNTRmYTkyMGU5ODdhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEwNzk4MjQyODkwMzExMDIxMDYyMCIsIm5iZiI6MTY3NzYyNzMwMCwiZXhwIjoxNjc3NjU2MTAwfQ.lvRBs60R6yyNXg4qCvR3NEkJ9jJLLCMqMgjQSM5NaUE'
    // to change !!!!

    const maxAge = 60 * 60 * 8;
    const setCookie = cookie.serialize('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      sameSite: 'strict',
      path: '/',
    });

    res.setHeader('Set-Cookie', setCookie);
    console.log('done')
  } catch (err) {
    console.error(err)
    res.status(401).json({message: "Unauthorized"})
  }
  res.end()

}