import Image from "next/image";

export default function Login() {

    async function login() {
        /*
        fetcher_auth('login').then(response => {
            response.json().then(
                rep => window.open(rep['url'])
            )
        })*/
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NzUzMjAyMywianRpIjoiZmJlMTgyODYtMDEwNC00ZDVlLThkZGYtODI4MjY1YTFhY2Y4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEwNzk4MjQyODkwMzExMDIxMDYyMCIsIm5iZiI6MTY3NzUzMjAyMywiZXhwIjoxNjc3NTYwODIzfQ.fr6EZAQ-npG1xJjlllWT7nfUNCMARIRwFlZwCH5Hnl0'
        //await setUserCookie(NextResponse.next(), token)
        //await fetch('/api/auth?' + USER_TOKEN + "=" + token, {method: 'POST'})
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