const https = require('https');


export async function getServerSideProps(context) {
    let token = context.query["token"];
    const absoluteUrl = context.req.headers.host

    // allow self-signed certificate when not in production
    let response
    if (process.env.NODE_ENV !== "production") {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        response = await fetch("https://" + absoluteUrl +'/api/logincallback?token=' + token, {agent})
            .catch(err => console.log(err));

   } else {
        // don't allow it in production
        response = await fetch("https://" + absoluteUrl +'/api/logincallback?token=' + token)
                    .catch(err => console.log(err));;
    }
    console.log(response)

    //const data = await response.json();

    // redirect the user to a new page
    return {
        redirect: {
            destination: `/`,
            permanent: true,
        },
    };
}

function Redirect() {
      // This code will not be executed as the user is redirected before the page is rendered
      return (
            <div></div>
      );
}

export default Redirect;