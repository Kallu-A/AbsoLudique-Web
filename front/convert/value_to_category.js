export const valueToCategory = new Map()
valueToCategory.set(1, 'carte')
valueToCategory.set(2, 'deck building')
valueToCategory.set(3, 'coopératif')
valueToCategory.set(4, 'trahison')
valueToCategory.set(5, 'stratégie')
valueToCategory.set(6, 'bluff')
valueToCategory.set(7, 'réflexion')

/*
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
}*/

export default function value_to_category(value) {

    return valueToCategory.get(value)
}