import {fetcher} from "../api";

export const valueToCategory = new Map()

export async function setup_valueToCategory(map) {
     fetcher('dict/category').then( array => {
       array.forEach( value => {
           Object.keys(value)
               .forEach( key => {
                   map.set(value[key], key)
               })
       })
    }).catch( error => {
        console.log(error)
     })
}

export default function value_to_category(value) {

    return valueToCategory.get(value)
}