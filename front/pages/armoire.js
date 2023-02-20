import {fetcher} from "../api";
import Game from "../components/game";
import useSWRInfinite from "swr/infinite";
import {useState} from "react";
import ModalGame from "../components/modal_game";

let PAGE_SIZE = 30

export default function armoire() {
    const [player, setPlayer] = useState();
    const [difficulty, setDifficulty] = useState();
    const [duration, setDuration] = useState();
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [data_game, setDataGame] = useState(null);

    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = useSWRInfinite(
        (index) => 'games?cursor=' + ( (index * PAGE_SIZE) + 1) + '&limit=' + PAGE_SIZE
            + ( (player !== '') ? '&players=' + player : '')
            + ( (difficulty !== '') ? '&difficulty=' + difficulty : '')
            + ( (duration !== '') ? '&duration=' + duration : '')
            + ( (name !== '') ? '&name=' + name : '')
        ,
        fetcher
    );

    const games = data ? [].concat(...data) : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    return (
        <>
            <ModalGame game={data_game} isShow={show} setShow={setShow}/>

            <div className="vertical-bar bg-grey-litle-plain padding-bar">
                <h1 className='text-xl center-text margin-title title-color'>Filtre</h1>
                <hr className=''></hr>

                <input className='input-player margin-top-xs'
                        value={player}
                        onChange={(e) => setPlayer(e.target.value)}
                /> <span>Joueurs</span>


                <p className='margin-top-xs'>Difficulté</p>
                <select
                       value={difficulty}
                       onChange={(e) => setDifficulty(e.target.value)}
                        className='input-difficulty'>

                    <option value='' label="aucun choix"></option>
                    <option value='1' label="facile"></option>
                    <option value='2' label="moyen"></option>
                    <option value='3' label="difficile"></option>
                    <option value='4' label="très difficile"></option>
                </select>

                <input className='input-duration margin-top-xs'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                /> <span>Minutes</span>

                <p className='margin-top-xs'>Nom du jeu</p>
                <input className='input-name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                />

                <button className='button-style button-smaller margin-top-xs' onClick={() => {
                    setDuration('')
                    setPlayer('')
                    setDifficulty('')
                    setName('')
                }
                }>
                    Réinitialiser
                </button>
            </div>

            <div className='scrollable-vertical decal-vertical-bar'>

                <div className='flex flex-wrap padding flex-games'>
                    { games && games.map( (game) => {
                        return (
                            <div className='pickable'
                                key={game.idBoardgame}
                                onClick={() => {
                                setDataGame(game)
                                setShow(true)
                            } }>
                               <Game key={game.idBoardgame} game={game}/>
                            </div>
                        )
                    })}
                </div>

                <div className='center-text padding'>
                    { games && !isReachingEnd && <>
                            <button className='button-style button-larger center-button'
                                disabled={isLoadingMore || isReachingEnd}
                                onClick={() => setSize(size + 1)}
                            >
                                {isLoadingMore
                                    ? "chargement..."
                                    : "voir plus"}
                            </button>
                        </>
                    }
                </div>
            </div>



        </>
    )
}