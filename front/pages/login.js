import Image from "next/image";
import {useRouter} from "next/router";
import {fetcher} from "../api";

export default function Login() {
    const router = useRouter()
    let callback = router.query['callbackUrl']
    if (callback === undefined || callback === '' || callback === null) {
        callback = '/'
    }

    async function login() {
        let hostname = window.location.hostname
        let port = window.location.port
        let redirect_callback = "?redirect_callback=" + "https://" + hostname + ":" + port + "/logincallback"
        const resp = await fetcher( "login" + redirect_callback)
            .catch(err => {
          console.error(err)
        })
        window.location.replace(resp.url)
        //await router.push(callback)
    }

    return (
        <>
            <div className="inset-backdrop-not-nav overflow-y-auto backdrop">
                <div className='centered-element padding-35-60 shadow-el rounded-0p75 bg-white'>
                    <Image src="/logo.svg" alt="logo d'abso'ludique" width="250" height="250" />
                    <div className=' padding-1 text-center'>
                        <h1 className='title-color text-2'>Abso'Ludique</h1>
                        <p className='text-1p6'>Télécom Nancy</p>
                        <div className='margin-top-50 button-smaller padding-20 button-style center-button'>
                            <button className='margin-10' onClick={login}>
                                Connexion avec<br></br>
                                @telecomnancy.net
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}