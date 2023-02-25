export const BACK_PATH = "https://localhost:5000/";

export const fetcher = (path) => fetch( BACK_PATH + path).then(res => res.json())