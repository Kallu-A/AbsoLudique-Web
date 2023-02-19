import enum

from sqlalchemy import Enum

from setup_sql import db


class CategoryValue(enum.Enum):
    card = 1


# Category of board games
class Category(db.Model):
    __tablename__ = "category"

    idCategory = db.Column(db.Integer, primary_key=True, autoincrement=True)

    idBoardGame = db.Column(db.Integer, db.ForeignKey("board_game.idBoardgame"))
    boardGame = db.relationship("Boardgame", back_populates="category")

    category = db.Column(Enum(CategoryValue))
