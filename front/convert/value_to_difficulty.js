export const valueToDifficulty = new Map()
valueToDifficulty.set(1, 'facile')
valueToDifficulty.set(2, 'moyen')
valueToDifficulty.set(3, 'difficile')
valueToDifficulty.set(4, 'très difficile')

export default function value_to_difficulty(value) {
    return valueToDifficulty.get(value)
}