let valueToDifficulty = {
    1: 'facile',
    2: 'moyen',
    3: 'difficile',
    4: 'très difficile',
}

export default function value_to_difficulty(value) {
    return valueToDifficulty[value]
}