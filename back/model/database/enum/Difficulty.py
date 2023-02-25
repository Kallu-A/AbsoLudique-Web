import enum


class Difficulty(enum.Enum):
    easy = 1
    medium = 2
    hard = 3
    very_hard = 4


def difficulty_value_json():
    return [
        {"facile": Difficulty.easy.value},
        {"moyen": Difficulty.medium.value},
        {"difficile": Difficulty.hard.value},
        {"très difficile": Difficulty.very_hard.value},
    ]
