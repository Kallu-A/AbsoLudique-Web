import Game from "./game";
import useSWRInfinite from "swr/infinite";
import {useEffect, useState} from "react";
import ModalGame from "./modal_game";
import {valueToCategory} from "../convert/value_to_category";
import {valueToDifficulty} from "../convert/value_to_difficulty";
import {BACK_PATH, REDIRECT_GOOGLE} from "../api";
import Image from "next/image";

let PAGE_SIZE = 30

export default function cabinet(token) {
    const [player, setPlayer] = useState();
    const [difficulty, setDifficulty] = useState();
    const [duration, setDuration] = useState();
    const [key, setKey] = useState(-1);
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [data_game, setDataGame] = useState(null);

     const [tokenValue, setTokenValue] = useState(token)

    useEffect( () => {
        fetch('/api/token')
          .then(response => {
            response.json().then(value => setTokenValue(value));
            mutate()
          });

        }, []);

    let category_values = Array.from(valueToCategory.values());
    let category_key = Array.from(valueToCategory.keys());

    let categories = []
    for (let cat in category_values) {
        categories.push(useState(false))
    }

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
            + ( '&category=' + categories
                .map( (value, index) => [value, category_key[index]] )
                .filter( (value) => value[0][0] )
                .map( (value) => value[1]  )
                .join('/'))
        ,
        (path) => {
    return fetch( BACK_PATH + path, {
        mode: 'cors',
        credentials: 'omit',
        redirect: 'follow',
        headers: {
            'Authorization': 'Bearer ' + tokenValue,
            'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
        }
    }).then(res => res.json())
},
    );


    const games = data ? [].concat(...data) : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    return (
        <>
            <ModalGame game={data_game} key={key} isShow={show} setShow={setShow} tokenValue={token} deleteCallback={mutate}/>

            <div className="vertical-bar bg-grey-litle-plain">
                <div className='scrollable-vertical-filter padding-bar'>
                    <h1 className='text-1p6 center-text margin-top-bottom-5 title-color'>Filtre</h1>
                    <hr className=''></hr>

                    <p className='margin-top-20'>Nom du jeu</p>
                    <input className='input-name input'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                    /><br></br>

                    <input className='input-player margin-top-20'
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                    /> <span>Joueurs</span> <br></br>

                    <input className='input-duration margin-top-20'
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                    /> <span>Minutes</span> <br></br>

                    <p className='margin-top-20'>Difficulté</p>
                    <select
                           value={difficulty}
                           onChange={(e) => setDifficulty(e.target.value)}
                            className='input-difficulty'>

                        <option value='' label="aucun choix"></option>
                        { Array.from(valueToDifficulty).map((value) => {
                            return <option key={value[0]} value={value[0]} label={value[1]}></option>
                        })}

                    </select>

                    <hr className='margin-top-20'></hr>

                    <h1 className='margin-top-20 text-1p1 center-text title-color'>Catégories</h1>
                    <div className="flex flex-column margin-top-20 justify-center">

                        { category_values.map( (value, index) => {
                            return (
                                <div key={value} className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                                        type="checkbox"
                                        value={categories[index][0]}
                                        checked={categories[index][0]}
                                        onChange={(e) => {
                                            categories[index][1](e.target.checked)
                                            mutate()
                                        }}
                                        id={`{checkboxDefault${index}`}/>
                                    <label
                                        className="inline-block pl-[0.15rem] margin-left-5 hover:cursor-pointer"
                                        htmlFor={`{checkboxDefault${index}`}>
                                        {value}
                                    </label>
                                </div>
                            )
                        })}

                    </div>

                    <button className='button-style button-smaller margin-top-20' onClick={() => {
                        setDuration('')
                        setPlayer('')
                        setDifficulty('')
                        setName('')
                        for (let i = 0; i < categories.length; i++) {
                            categories[i][1](false)
                        }
                        mutate()
                    }
                    }>
                        Réinitialiser
                    </button>
                </div>
            </div>

            <div className='scrollable-vertical decal-vertical-bar-200'>

                <div className='flex flex-wrap padding-20 flex-games'>
                    { games.length === 0 && !isReachingEnd &&
                    <div>
                        <Image title="Chargement" src="/loading.gif" alt="Chargement" width="50" height="100"/>Chargement...
                    </div>
                    }
                    { games && games.map( (game) => {
                        if (game.idBoardgame !== null && game.idBoardgame !== undefined)
                            return (
                                <div className='pickable'
                                    key={game.idBoardgame}
                                    onClick={() => {
                                        setDataGame(game)
                                        setKey(game.idBoardgame)
                                        setShow(true)
                                } }>
                                    {/* adminValue &&
                                       <Link href={`/game/${game.idBoardgame}`} className='absolute radius-10 shadow-el background-white padding-2'>
                                            <Image  src="/edit.png" alt="Éditer le jeu" width="30" height="30"
                                                                className=''></Image>
                                        </Link>*/}
                                   <Game key={game.idBoardgame} game={game}/>
                                </div>
                            )
                        else
                            return <></>
                    })}
                </div>

                <div className='center-text padding-20'>
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
                    {isReachingEnd && games.length === 0 &&
                        <div className='text-2'>Aucun jeu trouvé</div>
                    }
                </div>
            </div>



        </>
    )
}