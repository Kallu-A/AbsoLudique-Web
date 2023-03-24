import {useContext} from "react";
import {Context} from "../context";
import {BACK_PATH, REDIRECT_GOOGLE} from "../api";

export async function verifyAuth(token) {
    // add custom verification of authenticity of token
    return true
}

export function getToken(context) {
    let token = null
    const { req } = context;
    const cookie = req.headers.cookie;
    const cookies = cookie ? cookie.split('; ').reduce((acc, curr) => {
    const [name, value] = curr.split('=');
    acc[name] = value;
    return acc;
  }, {}) : {};

    return cookies.jwt
}

export function setAdmin(token) {
    const {adminValue, setAdmin} = useContext(Context);
    if (adminValue === true)
        return

    fetch(BACK_PATH + 'user/admin', {
        mode: 'cors',
        credentials: 'omit',
        redirect: 'follow',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': [BACK_PATH, REDIRECT_GOOGLE]
        }
    }).then(res => {
        res.body.getReader().read().then(value => {
            let res = new TextDecoder("utf-8").decode(value.value)
            if (res === 'True') setAdmin(true)
            else setAdmin(false)
        })
    })
        .catch(err => console.log(err))
}