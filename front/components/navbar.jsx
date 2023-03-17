import Link from 'next/link';
import {useContext, useEffect, useState} from 'react';
import Image from 'next/image'
import {useRouter} from "next/router";
import {Context} from "../context";


export default function Navbar() {
    const { admin, setAdmin } = useContext(Context);
    // add here to put it in the navbar
    const navigationRoutes = [
        { name:"Armoire", path:"armoire" },
    ];
    const navigationRoutesAdmin = [
        { name:"Ajout jeu", path:"ajout/jeu" },
    ];


  const [active, setActive] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };

  async function logout() {
      await fetch('/api/logout', {method: 'POST'})
      handleClick()
      await router.push('/login')
    }

    useEffect( ()=> {
        console.log(admin)
    })

  return (
    <>

      <nav className='flex items-center flex-wrap bg-grey-heavy p-3 '>

        {/* left part */}
        <Link href='/' className='inline-flex items-center p-2 mr-4 '>
            <Image src="/logo.svg" alt="logo d'abso'ludique" width="80" height="60" />

            <span className='text-1p6 text-white font-bold uppercase tracking-wide select'>
              Abso'Ludique
            </span>
        </Link>

        {/* hamburger nav */}
        { navigationRoutes.length !== 0 &&

        <button
          className=' inline-flex p-3 hover:bg-grey-medium rounded-0p25 lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>}

        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >

            {/* right part */}
            {router.pathname !== '/login' &&
              <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
                  {/* if is admin */}
                  { admin === true && navigationRoutesAdmin.map((route) => {
                      const isActive = router.asPath === '/' + route.path
                      return (
                          <Link href={`/${route.path}`} className={`${isActive ? 'active-path': 'hover:bg-grey-medium hover:text-white'} text-s lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center`}>
                              <div className={`${isActive ? 'active-text': 'not-active-text'}`}>
                                  {route.name}
                              </div>
                          </Link>)
                  })}
                  { navigationRoutes.map((route) => {
                      const isActive = router.asPath === '/' + route.path
                      return (
                          <Link href={`/${route.path}`} className={`${isActive ? 'active-path': 'hover:bg-grey-medium hover:text-white'} text-s lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center`}>
                              <div className={`${isActive ? 'active-text': 'not-active-text'}`}>
                                  {route.name}
                              </div>
                          </Link>)
                  })}
                  <div onClick={logout} className="select text-s lg:inline-flex lg:w-auto w-full px-3 py-2 hover:bg-grey-medium hover:text-white rounded text-white font-bold items-center justify-center">
                      Déconnexion
                  </div>
              </div>
            }

        </div>
      </nav>
    </>
  );
};

