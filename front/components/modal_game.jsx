import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useContext} from "react";
import {BACK_PATH, REDIRECT_GOOGLE} from "../api";
import Image from "next/image";
import value_to_difficulty from "../convert/value_to_difficulty";
import value_to_category from "../convert/value_to_category";
import {Context} from "../context";
import Link from "next/link";
import {useRouter} from "next/router";

export default function GameModal({game, isShow, setShow, tokenValue, deleteCallback}) {
    const { adminValue, setAdmin } = useContext(Context);
    const router = useRouter()
    function closeModal() {
        setShow(false)
    }

    function deleteGame() {
        if (confirm('Voulez-vous vraiment supprimer ce jeu ?'))
            fetch(BACK_PATH + 'game/' + game.idBoardgame, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'omit',
                redirect: 'follow',
                headers: {
                    'Authorization': 'Bearer ' + tokenValue,
                    'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
             }})
                .then(res => {
                    deleteCallback()
                    closeModal()
                })
                .catch(err => console.log(err))
    }

    return (
        <>
        { game && <Transition appear show={isShow} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto backdrop"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
          &#8203;
        </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full modal-game-size p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl shadow-el border">
                            <Dialog.Title
                                as="h1"
                                className="font-bold text-2 center-text leading-6 text-gray-900"
                            >
                                {game.name}
                            </Dialog.Title>


                            <div className="mt-2">
                                <img src= {`${BACK_PATH + "static/" + ((game.picture !== '') ?  'upload/' + game.picture: 'default.png')}`}
                                    alt={`${'image du jeu ' + game.name}`} className='img-game-alone img-center padding-1'/>

                                <div className='flex justify-center' title="Nombre de joueurs">
                                    <div className='bg-grey-lite rounded-0p25 inline-flex padding-0p4'>
                                        <Image title="Nombre de joueurs" src="/players.png" alt="Nombre de joueurs" width="20" height="20"/>
                                        <p className='margin-left-5'>{game.minPlayers}-{game.maxPlayers}</p>
                                    </div>
                                    <div className='bg-grey-lite rounded-0p25 inline-flex margin-left-10 padding-0p4' title="Durée d'une partie">
                                        <Image title="Durée d'une partie" src="/duration.png" alt="Durée d'une partie" width="20" height="20"/>
                                        <p className='margin-left-5'>{game.duration} minutes</p>
                                    </div>
                                    <div title="Difficulté du jeu" className='bg-grey-lite rounded-0p25 inline-flex margin-left-10 padding-0p4'>
                                        <p>{value_to_difficulty(game.difficulty)}</p>
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-center' title="Catégories>">
                                    { game.category.map( ( {category} ) => {
                                        return (
                                            <div className='mt-1 bg-grey-lite margin-left-5 margin-right-5 rounded-0p25 inline-flex padding-0p4'>
                                                <p>{value_to_category(category)}</p>
                                            </div>
                                        )
                                    })}

                                </div>

                                <p className='whitespace-newline'>
                                    {game.description}
                                </p>

                            </div>

                            <div className="mt-4 end-text">

                                { adminValue &&
                                    <>
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-1p6 duration-300 delete-button mr-4 mt-1"
                                            onClick={deleteGame}>
                                            Supprimer
                                        </button>

                                        <button type="button"
                                                onClick={ () => router.push(`/game/${game.idBoardgame}`)} className='px-4 py-2 text-1p6 button-style duration-300 mr-4 mt-1'>
                                           Modifier
                                        </button>
                                    </>
                                }
                                <button
                                    type="button"
                                    className="px-4 py-2 text-1p6 button-style duration-300 mt-1"
                                    onClick={closeModal}>
                                    Retour
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition> }
        </>
    );
}
