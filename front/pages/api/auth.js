import cookie from 'cookie';

export default async function login(req, res) {
  if (req.method !== 'POST') {
    res.status(401).json({message: "Unauthorized"})
  }

  try {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3Nzg4NTQ5MCwianRpIjoiNTUwYTljMDQtMWViMC00YWFhLWI4ZTgtYzY3YWEyZmQyZmNkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEwNzk4MjQyODkwMzExMDIxMDYyMCIsIm5iZiI6MTY3Nzg4NTQ5MCwiZXhwIjoxNjc3OTE0MjkwfQ.YNeJsKx-Aho3hbvIXnakVmhKa3bKxOh0sUDhg1lyRJk'
    // TODO to change !!!!

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