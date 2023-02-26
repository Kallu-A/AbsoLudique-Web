import {useState} from "react";
import {BACK_PATH, fetcher_post} from "../api";

export default function add_game() {

    const [name, setName] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('1')
    const [minPlayers, setMinPlayers] = useState('')
    const [maxPlayers, setMaxPlayers] = useState('')
    const [duration, setDuration] = useState('')
    const [file, setFile] = useState('')

    const save = async (e) => {
        e.preventDefault()

        let input = document.querySelector('input[type="file"]')


        let formdata = new FormData()

        formdata.append("data", JSON.stringify({
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
            const res = await fetcher_post('game', formdata)

            if (res.status === 200) {
                setName('')
                setState('')
                setDescription('')
                setDifficulty('1')
                setMinPlayers('')
                setMaxPlayers('')
                setDuration('')
                setFile('')

                alert("Jeu ajouter")

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
        <div className='centered-element shadow-el padding-20 rounded-0p75 height-limited-600'>
            <h1 className='text-2 center-text margin-top-bottom-5 title-color'>Ajout d'un jeu</h1>
            <hr className='margin-padding-bottom-20'></hr>

            <div className='scrollable-vertical-form'>
                <form className='mt-4 w-fit-content max-w-add-game display-form'>

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

                    { name !== '' && state !== '' && description !== '' && difficulty !== '' && minPlayers !== ''
                        && maxPlayers !== '' && duration !== '' && file !== '' && <div className='center-text'>
                        <button type="submit" className='button-style button-larger margin-top-20' onClick={save}
                        >Enregistrer</button>
                    </div>}

            </form>
            </div>

        </div>
    )
}
