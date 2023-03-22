import { useRouter } from 'next/router'
import {BACK_PATH, REDIRECT_GOOGLE} from "../../api";
import {useEffect, useState} from "react";
import {getToken, setAdmin} from "../../lib/auth";
import add_game from "../../components/add_game";
import put_game from "../../components/put_game";

export default function GamePage({token}) {
    setAdmin(token)

    const router = useRouter()
    const idBoardGame  = router.query.idBoardgame
    const [show, setshow] = useState(0);

    useEffect (() => {
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
        }).catch(err => console.log(err))
    })

    let putGame = put_game(token, idBoardGame)
    return (
        <>
            {show === 0 &&
                <div className='center-text text-center text-2 centered-element'>
                    Authentification...
                </div>
            }
            {show === 1 &&
                putGame
            }
            {show === 2 &&
                <div className='center-text text-center text-2 centered-element'>
                    Non autorisé
                </div>
            }
        </>
    )
}
export async function getServerSideProps(context) {
    let token = getToken(context)
    return {
        props: {
            token
        },
    };
}
