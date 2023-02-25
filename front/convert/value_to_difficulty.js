import {fetcher} from "../api";

export const valueToDifficulty = new Map()

export async function setupValueToDifficulty(map) {
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

export default function value_to_difficulty(value) {
    return valueToDifficulty.get(value)
}