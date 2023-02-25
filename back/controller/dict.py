from flask_login import login_required

from controller import app
from model.path.dict_model import get_category_dict_model, get_difficulty_dict_model


# return as json the dict of difficulty
@app.get("/dict/difficulty")
@login_required
def get_difficulty_dict():
    return get_difficulty_dict_model()


# return as json the dict of category
@app.get("/dict/category")
@login_required
def get_category_dict():
    return get_category_dict_model()
