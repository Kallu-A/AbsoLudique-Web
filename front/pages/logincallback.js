import cookie from "cookie";

export async function getServerSideProps(context) {
    let token = context.query["token"];

    const maxAge = 60 * 60 * 8
    const headers = {
        Location: "/process",
        'Set-Cookie': cookie.serialize('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge,
            sameSite: 'strict',
            path: '/',
        })
    };
    await context.res.writeHead(302, headers);
    context.res.end();
    return  {
        props:{},
    }
}

function Redirect() {
      // This code will not be executed as the user is redirected before the page is rendered
      return (
            <div></div>
      );
}

export default Redirect;