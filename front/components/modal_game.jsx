import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {BACK_PATH} from "../api";
import Image from "next/image";
import value_to_difficulty from "../convert/value_to_difficulty";
import value_to_category from "../convert/value_to_category";

export default function GameModal({game, isShow, setShow}) {
    function closeModal() {
        setShow(false)
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
                                className="font-bold text-xxl center-text leading-6 text-gray-900"
                            >
                                {game.name}
                            </Dialog.Title>


                            <div className="mt-2">
                                <img src= {`${BACK_PATH + "static/upload/" + game.picture}`}
                                    alt={`${'image du jeu ' + game.name}`} className='img-game-alone img-center padding-small'/>

                                <div className='flex justify-center' title="Nombre de joueurs">
                                    <div className='bg-grey-lite rounded inline-flex padding-litle'>
                                        <Image title="Nombre de joueurs" src="/players.png" alt="Nombre de joueurs" width="20" height="20"/>
                                        <p className='margin-left-s'>{game.minPlayers}-{game.maxPlayers}</p>
                                    </div>
                                    <div className='bg-grey-lite rounded inline-flex margin-left-xl padding-litle' title="Durée d'une partie">
                                        <Image title="Durée d'une partie" src="/duration.png" alt="Durée d'une partie" width="20" height="20"/>
                                        <p className='margin-left-s'>{game.duration} minutes</p>
                                    </div>
                                    <div title="Difficulté du jeu" className='bg-grey-lite rounded inline-flex margin-left-xl padding-litle'>
                                        <p>{value_to_difficulty(game.difficulty)}</p>
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-center' title="Catégories>">
                                    { game.category.map( ( {category} ) => {
                                        return (
                                            <div className='mt-1 bg-grey-lite margin-left-s margin-right-s rounded inline-flex padding-litle'>
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
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm button-style duration-300"
                                    onClick={closeModal}
                                >
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
