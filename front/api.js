export const BACK_PATH = "https://localhost:5000/";
export const REDIRECT_GOOGLE = "https://www.google.com/"


export const fetcher = (path) => fetch( BACK_PATH + path, {
    mode: 'cors',
    credentials: "omit",
    redirect: 'follow',
    headers: {
        'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
    }
}).then(res => res.json())

export const fetcher_auth = (path) => fetch( BACK_PATH + path, {
    mode: 'cors',
    credentials: "omit",
    redirect: 'follow',
    headers: {
        'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
    }
})

export const fetcher_post = (path, data) => fetch(BACK_PATH + path, {
    method: 'post',
    redirect: 'follow',
    credentials: "omit",
    body: data
})