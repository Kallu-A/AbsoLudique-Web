import {useRouter} from "next/router";
import {useEffect} from "react";
import Image from "next/image";


function Process() {
    const router = useRouter()

    useEffect( () => {
        router.push('/')
    })
      // This code will not be executed as the user is redirected before the page is rendered
      return (
            <div className='center-text text-center text-2 centered-element'>

             <Image title="Chargement" src="/loading.gif" alt="Chargement" width="50" height="100"/>Connexion...
            </div>
      );
}

export default Process;