import {useEffect, useState} from "react";
import {BACK_PATH, fetcher_post, REDIRECT_GOOGLE} from "../api";
import {valueToCategory} from "../convert/value_to_category";
import Image from "next/image";

export default function put_game(token, idGame) {
    let init = false

    const [name, setName] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('1')
    const [minPlayers, setMinPlayers] = useState('')
    const [maxPlayers, setMaxPlayers] = useState('')
    const [duration, setDuration] = useState('')
    const [file, setFile] = useState('')

    let category_values = Array.from(valueToCategory.entries());
    let categories = []
    for (let cat in category_values) {
        categories.push(useState(false))
    }

    useEffect( () => {
        if (!init) {
            init = true
            fetch( BACK_PATH + 'game/' + idGame , {
                mode: 'cors',
                credentials: 'omit',
                redirect: 'follow',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
                }
            }).then(res => {
                res.json().then( game => {
                    setName(game.name)
                    setState(game.state)
                    setDescription(game.description)
                    setMinPlayers(game.minPlayers)
                    setMaxPlayers(game.maxPlayers)
                    setDifficulty(game.difficulty)
                    setDuration(game.duration)
                    let category = game.category
                    for (let cat in category) {

                        categories[category[cat].category - 1][1](true)
                    }
                })

            }).catch(err => console.log(err))


        }
    })

    const save = async (e) => {
        e.preventDefault()

        let input = document.querySelector('input[type="file"]')
        let formdata = new FormData()

        formdata.append("data", JSON.stringify({
            'idBoardgame': idGame,
            'name': name,
            'state': state,
            'description': description,
            'difficulty': Number(difficulty),
            'minPlayers': minPlayers,
            'maxPlayers': maxPlayers,
            'duration': duration,
            })
        )

        formdata.append("file",  input.files[0])
        try {
            const res = await fetch( BACK_PATH + 'game', {
                method: 'put',
                mode: 'cors',
                credentials: 'omit',
                redirect: 'follow',
                body: formdata,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Access-Control-Allow-Origin':[BACK_PATH, REDIRECT_GOOGLE]
                }
            })

            if (res.status === 200) {
                setFile('')

                res.body.getReader().read().then( value => {
                    let id = new TextDecoder("utf-8").decode(value.value)
                    for (let cat in categories) {
                        let action = (categories[cat][0]) ? "0" :  "1"
                        fetch(BACK_PATH + 'category/' + id + "/" + category_values[cat][0] + "/" + action, {
                            method: 'put',
                            mode: 'cors',
                            credentials: 'omit',
                            redirect: 'follow',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Access-Control-Allow-Origin': [BACK_PATH, REDIRECT_GOOGLE]
                            }
                        })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                })

                alert("Jeu modifié")

            } else {
                res.body.getReader().read().then( value => alert(
                    "status : " + res.status + " - " +
                    new TextDecoder("utf-8").decode(value.value)
                ))
            }
        } catch(err) {
            alert(err)
            }
        }

    return (
        <div className="scrollable-vertical-game">
             <div className='content-scrollable margin-auto z-index-0 shadow-el padding-20 rounded-0p75 '>
            <h1 className='text-2 center-text margin-top-bottom-5 title-color vertical-align'>Modifier le jeu</h1>
            <img src= {`${BACK_PATH + "static/" + ((idGame !== '') ?  'upload/' + idGame: 'default.png')}`}
                 alt='image du jeu' width="60" height="60" className="vertical-align ml-20"/>
            <hr className='margin-padding-bottom-20'></hr>


            <div className='margin-auto flex flex-center'>
                <form className='w-fit-content max-w-add-game display-form'>

                <div className="md:flex  md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="name" className='title-color text-1p4'>
                            Nom du jeu</label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}
                               className='input bg-grey-lite font-bold py-2 px-4 focus:outline-none focus:shadow-outline' required />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="state" className='title-color text-1p4'>
                            État du jeu</label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="text" id="state" name="state" value={state} onChange={e => setState(e.target.value)}
                               className='input bg-grey-lite py-2 font-bold px-4 focus:outline-none focus:shadow-outline' required />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                         <label htmlFor="input" className='title-color text-1p4'>
                             Description</label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea id="description" name="description"  value={description} onChange={e => setDescription(e.target.value)}
                            className='input bg-grey-lite py-2 font-bold px-4 focus:outline-none focus:shadow-outline' required />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="difficulty" className='title-color text-1p4'>
                            Difficulté</label>
                    </div>
                    <div className="md:w-2/3">
                        <select
                               value={difficulty}
                               onChange={(e) => setDifficulty(e.target.value)}
                                className='input input bg-grey-lite py-2 font-bold px-4 focus:outline-none focus:shadow-outline'>
                            <option value='1'  label="facile"></option>
                            <option value='2' label="moyen"></option>
                            <option value='3' label="difficile"></option>
                            <option value='4' label="très difficile"></option>
                        </select>
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="minPlayers" className='title-color text-1p4'>
                            Joueur minimum</label>
                    </div>
                    <div className="md:w-2/3">
                         <input type="text" id="minPlayers" name="minPlayers" value={minPlayers} onChange={e => setMinPlayers(e.target.value)}
                                className='input bg-grey-lite py-2 font-bold px-4 focus:outline-none focus:shadow-outline' required />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                       <label htmlFor="input" className='title-color text-1p4'>
                            Joueur maximum</label>
                    </div>
                    <div className="md:w-2/3">
                         <input type="text" id="maxPlayers" name="maxPlayers" value={maxPlayers} onChange={e => setMaxPlayers(e.target.value)}
                                className='input bg-grey-lite py-2 font-bold px-4 focus:outline-none focus:shadow-outline' required />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                       <label htmlFor="duration" className='title-color text-1p4'>
                           Durée</label>
                    </div>
                    <div className="md:w-2/3">
                      <input type="text" id="duration" name="duration" value={duration} onChange={e => setDuration(e.target.value)}
                             className='input bg-grey-lite py-2 font-bold px-4 focus:outline-none focus:shadow-outline' required />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                       <label className="title-color text-1p4" htmlFor="user_avatar">
                       Image du jeu</label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="block rounded-0p25 w-fit cursor-pointer border focus:outline-none focus:border-transparent rounded-lg"
                            value={file} onChange={e => setFile(e.target.value)}
                            accept=".png,.jpg,.jpeg"
                            aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                      </div>
                </div>

                    <div className="md:flex mb-6 flex-category margin-10">
                        <div className="md:w-1/3">
                            <label className="title-color text-1p4" htmlFor="user_avatar">
                                Catégories</label>
                        </div>
                        <div className="md:w-2/3">
                            { category_values.map( (value, index) => {
                                return (
                                    <span key={value} className="ml-5 margin-right-5">
                                        <input
                                            className="bg-white outline-none"
                                            type="checkbox"
                                            value={categories[index][0]} checked={categories[index][0]}
                                            onChange={(e) => categories[index][1](e.target.checked)}
                                            id={`{checkboxDefault${index}`}/>
                                        <label
                                            className="pl-[0.15rem] margin-left-5 hover:cursor-pointer"
                                            htmlFor={`{checkboxDefault${index}`}>
                                            {value[1]}
                                        </label>
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    { name !== '' && state !== '' && description !== '' && difficulty !== '' && minPlayers !== ''
                        && maxPlayers !== '' && duration !== '' && <div className='center-text'>
                        <button type="submit" className='button-style button-larger margin-top-20' onClick={save}
                        >Enregistrer</button>
                    </div>}

            </form>
            </div>

        </div>
        </div>
    )
}
