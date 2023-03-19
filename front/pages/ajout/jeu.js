import add_game from "../../components/add_game";
import {setAdmin, getToken} from "../../lib/auth";
import {BACK_PATH, REDIRECT_GOOGLE} from "../../api";
import {useEffect, useState} from "react";

export default function addGame({token}) {
    setAdmin(token)
    const [show, setshow] = useState(0);

    useEffect(() => {
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
                if (res === 'True') setshow(1)
                else setshow(2)
            })
        })
            .catch(err => console.log(err))

    })
    let addGame = add_game(token)
    return (
        <>
            {show === 0 &&
                <div className='center-text text-center text-2 centered-element'>
                    Authentification...
                </div>
            }
            {show === 1 &&
                addGame
            }
            {show === 2 &&
                <div className='center-text text-center text-2 centered-element'>
                    Non autorisé
                </div>
            }
        </>
    )
}

// get the token
export async function getServerSideProps(context) {
    let token = getToken(context)

    return {
        props: {
            token,
        },
    };
}