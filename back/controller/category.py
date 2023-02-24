from controller import app
from model.path.category_model import post_category_model


# post a category to a existing boardgame
@app.post("/category/<int:id_game>/<int:category>")
def post_category(id_game: int, category: int):
    return post_category_model(id_game, category)
