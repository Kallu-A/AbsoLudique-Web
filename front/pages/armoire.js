import {fetcher} from "../api";
import Game from "../components/game";
import useSWR from 'swr'

function get_games(cursor, limit) {
	let path = 'games?cursor=' + cursor + '&limit=' + limit
	return useSWR(path, fetcher)
}

let items_per_call = 10

function actualise_pagination(pagination) {
	pagination.start = pagination.start + items_per_call
}

function new_content(pagination, games) {
	actualise_pagination(pagination)
	let new_games = get_games(pagination.cursor, pagination.limit).data
	console.log('new add')
	for (let game in new_games) {
		games.push(game)
	}
}

export default function armoire() {
	let pagination = {cursor: 1, limit: items_per_call}
	const games = get_games(pagination.cursor, pagination.limit).data


	return (
		<>

			<div className='flex flex-wrap margin flex-games'>
				{ games && games.map( (game) => {
				return (
					<Game key={game.idBoardgame} game={game}/>
				)
			})}
			</div>
			{ games && <>
				{pagination.cursor + pagination.limit === games.length + 1 &&
					<button onClick={new_content(pagination, games)}>Voir plus</button>
				}
			</>
			}

		</>
	)
}