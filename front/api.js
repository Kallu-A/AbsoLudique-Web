export const BACK_PATH = "http://localhost:5000/";

export const fetcher = (path) => fetch( BACK_PATH + path, {
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin':'*'
  }}).then(res => res.json())