import cabinet from "../components/cabinet";
import {getToken} from "../lib/auth";
import {useContext} from "react";
import {Context} from "../context";
import {BACK_PATH, REDIRECT_GOOGLE} from "../api";

export default function Home({token}) {
    fetch( BACK_PATH + 'user/admin', {
            mode: 'cors',
            credentials: 'omit',
            redirect: 'follow',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
            }
        }).then(res => {
            res.body.getReader().read().then( value => {
                let res = new TextDecoder("utf-8").decode(value.value)
                if (res === 'True') setAdmin(true)
                else setAdmin(false)
            })
        })
            .catch(err => console.log(err))
    const { adminValue, setAdmin } = useContext(Context);

    return (
        <div>
            {cabinet(token)}
        </div>
    );
}

// get the token
export async function getServerSideProps(context) {
    let token = getToken(context)
    return {
        props: {
            token
        },
    };
}