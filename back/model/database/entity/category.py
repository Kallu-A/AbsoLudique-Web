import enum

from setup_sql import db


class CategoryValue(enum.Enum):
    card = 1


# Category of board games
class Category(db.model):
    idCategory = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBoardGame = db.Column(db.Integer, db.ForeignKey("boardgame.idBoardgame"))

    category = db.Column(enum.Enum(CategoryValue))
