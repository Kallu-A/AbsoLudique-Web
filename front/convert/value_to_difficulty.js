import {fetcher} from "../api";

export const valueToDifficulty = new Map()
valueToDifficulty.set(1, 'facile')
valueToDifficulty.set(2, 'moyen')
valueToDifficulty.set(3, 'difficile')
valueToDifficulty.set(4, 'très difficile')


/*export async function setupValueToDifficulty(map) {
    fetcher('dict/difficulty')
        .then(array => {
        array.forEach(value => {
            Object.keys(value)
                .forEach(key => {
                    map.set(value[key], key)
                })
        })
    }).catch( error => {
        console.log(error)
     })
}
*/
export default function value_to_difficulty(value) {
    return valueToDifficulty.get(value)
}