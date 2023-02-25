import enum


class CategoryValue(enum.Enum):
    card = 1
    deckbuilding = 2
    cooperative = 3
    betrayal = 4


def cactegory_value_json():
    return [
        {"carte": CategoryValue.card.value},
        {"deck building": CategoryValue.deckbuilding.value},
        {"coopératif": CategoryValue.cooperative.value},
        {"trahison": CategoryValue.betrayal.value},
    ]
