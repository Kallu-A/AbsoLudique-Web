import enum


class CategoryValue(enum.Enum):
    card = 1
    deckbuilding = 2
    cooperative = 3
    betrayal = 4
    strategic = 5
    bluff = 6
    reflection = 7


def cactegory_value_json():
    return [
        {"carte": CategoryValue.card.value},
        {"deck building": CategoryValue.deckbuilding.value},
        {"coopératif": CategoryValue.cooperative.value},
        {"trahison": CategoryValue.betrayal.value},
        {"stratégie": CategoryValue.strategic.value},
        {"bluff": CategoryValue.bluff.value},
        {"réflexion": CategoryValue.reflection.value},
    ]
