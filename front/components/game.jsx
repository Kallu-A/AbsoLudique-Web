import {BACK_PATH} from "../api";
import Image from "next/image";
import value_to_difficulty from "../convert/value_to_difficulty";

export default function Game({game}) {
    return(
        <>
            <div className='w-fit h-fit rounded-0p75 margin-10 shadow-el padding-1'>
                <h1 className='text-1p6 center-text'>{game.name}</h1>
                <img src= {`${BACK_PATH + "static/" + ((game.picture !== '') ? 'upload/' + game.picture: 'default.png')}`}
                     alt={`${'image du jeu ' + game.name}`} className='img-game img-center padding-1'/>

                <div className='flex justify-center' title="Nombre de joueurs">

                    <div className='bg-grey-lite rounded-0p25 inline-flex padding-0p4'>
                        <Image title="Nombre de joueurs" src="/players.png" alt="Nombre de joueurs" width="20" height="20"/>
                        <p className='margin-left-5'>{game.minPlayers}-{game.maxPlayers}</p>
                    </div>

                    <div className='bg-grey-lite rounded-0p25 inline-flex margin-left-10 padding-0p4' title="Durée d'une partie">
                        <Image title="Durée d'une partie" src="/duration.png" alt="Durée d'une partie" width="20" height="20"/>
                        <p className='margin-left-5'>{game.duration} minutes</p>
                    </div>
                </div>

                 <div title="Difficulté du jeu" className='bg-grey-lite rounded-0p25 inline-flex margin-left-10 padding-0p4 margin-top-5 justify-center'>
                     <p className='margin-left-5'>{value_to_difficulty(game.difficulty)}</p>
                 </div>

            </div>
        </>
    )
}