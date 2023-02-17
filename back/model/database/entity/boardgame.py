import enum

from sqlalchemy import Enum

from setup_sql import db


class Difficulty(enum.Enum):
    easy = 1
    medium = 2
    hard = 3
    very_hard = 4


class Boardgame(db.model):
    __table_name = "board_game"

    idBoardgame = db.Column(db.Integer, primary_key=True, autoincrement=True)

    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    difficulty = db.Column(Enum(Difficulty))

    minPlayers = db.Column(db.Integer, nullable=False)
    maxPlayers = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # in minutes

    category = db.relationship("category", back_populates="category")

