from controller import app
from model.decorators import account_admin
from model.path.category_model import post_category_model, put_category_model

from flask_jwt_extended import jwt_required


# post a category to a existing boardgame
@app.post("/category/<int:id_game>/<int:category>")
@jwt_required()
@account_admin()
def post_category(id_game: int, category: int):
    return post_category_model(id_game, category)


# put a category to a existing boardgame
# or remove if already exists
# if remove !== 0 then remove the category
# else add the category
@app.put("/category/<int:id_game>/<int:category>/<int:remove>")
@jwt_required()
@account_admin()
def put_category(id_game: int, category: int, remove: int):
    return put_category_model(id_game, category, remove)
