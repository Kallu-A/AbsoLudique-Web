import json

from model.database.enum.CategoryValue import cactegory_value_json
from model.database.enum.Difficulty import difficulty_value_json, Difficulty


def get_category_dict_model():
    return json.dumps(cactegory_value_json())


def get_difficulty_dict_model():
    return json.dumps(difficulty_value_json())
