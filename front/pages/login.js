import Image from "next/image";
import {BACK_PATH, fetcher} from "../api";
import {redirect} from "next/navigation";

export default function Login() {

    function login() {
      /*  fetch( BACK_PATH + 'login', {
            redirect: 'follow',
            mode: 'no-cors',
            headers: {
            'Access-Control-Allow-Origin':BACK_PATH,
            'Access-Control-Allow-Credentials':true,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
            .then(r => {
                console.log(r)
                if(r.redirected){
                    const redirectedToUrl = r.url
                    redirect(redirectedToUrl)
                }
            })*/
        var requestOptions = {
    method: 'GET',
    redirect: 'follow',
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

fetch("https://localhost:5000/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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