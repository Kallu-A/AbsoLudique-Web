export const BACK_PATH = "https://localhost:5000/";


export const fetcher = (path) => fetch( BACK_PATH + path, {
    mode: 'cors',
    credentials: "omit",
    headers: {
        'Access-Control-Allow-Origin':BACK_PATH,
    }
}).then(res => res.json())


export const fetcher_post = (path, data) => fetch(BACK_PATH + path, {
    method: 'post',
    credentials: "omit",
    body: data
})