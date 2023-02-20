export const valueToCategory = new Map()
valueToCategory.set(1, 'carte')
valueToCategory.set(2, 'plateau')
valueToCategory.set(3, 'deck building')
valueToCategory.set(4, 'coopératif')
valueToCategory.set(5, 'trahison')
valueToCategory.set(6, 'roleplay')

export default function value_to_category(value) {
    return valueToCategory.get(value)
}