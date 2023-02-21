import {BACK_PATH} from "../api";
import Image from "next/image";
import value_to_difficulty from "../convert/value_to_difficulty";

export default function Game({game}) {
    return(
        <>
            <div className='w-fit h-fit rounded-xl margin-litle shadow-el padding-small'>
                <h1 className='text-xl center-text'>{game.name}</h1>
                <img src= {`${BACK_PATH + "static/" + ((game.picture !== '') ? 'upload/' + game.picture: 'default.png')}`}
                     alt={`${'image du jeu ' + game.name}`} className='img-game img-center padding-small'/>

                <div className='flex justify-center' title="Nombre de joueurs">

                    <div className='bg-grey-lite rounded inline-flex padding-litle'>
                        <Image title="Nombre de joueurs" src="/players.png" alt="Nombre de joueurs" width="20" height="20"/>
                        <p className='margin-left-s'>{game.minPlayers}-{game.maxPlayers}</p>
                    </div>

                    <div className='bg-grey-lite rounded inline-flex margin-left-xl padding-litle' title="Durée d'une partie">
                        <Image title="Durée d'une partie" src="/duration.png" alt="Durée d'une partie" width="20" height="20"/>
                        <p className='margin-left-s'>{game.duration} minutes</p>
                    </div>
                </div>

                 <div title="Difficulté du jeu" className='bg-grey-lite rounded inline-flex margin-left-xl padding-litle margin-top-litle justify-center'>
                     <p className='margin-left-s'>{value_to_difficulty(game.difficulty)}</p>
                 </div>

            </div>
        </>
    )
}