// theses  3 const a value that can needed to be changer

export const BACK_PATH = process.env.NODE_ENV === "production" ? "https://absoludique.com/" :"https://localhost:5000/";

export const REDIRECT_GOOGLE = "https://www.google.com/"

export const fetcher = (path) => fetch( BACK_PATH + path, {
    mode: 'cors',
    credentials: "omit",
    redirect: 'follow',
    headers: {
        'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
    }
}).then(res => res.json())

export const fetcher_post = (path, data) => fetch(BACK_PATH + path, {
    method: 'post',
    redirect: 'follow',
    credentials: "omit",
    body: data
})