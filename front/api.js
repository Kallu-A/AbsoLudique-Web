export const BACK_PATH = "https://localhost:5000/";

export const fetcher = (path) => fetch( BACK_PATH + path, {
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin':BACK_PATH,
    'Access-Control-Allow-Credentials':true
  }}).then(res => res.json())