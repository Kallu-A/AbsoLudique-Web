from sqlalchemy import Enum

from model.database.enum.Difficulty import Difficulty
from setup_sql import db


class Boardgame(db.Model):
    __tablename__ = "board_game"

    idBoardgame = db.Column(db.Integer, primary_key=True, autoincrement=True)

    name = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    difficulty = db.Column(Enum(Difficulty))
    picture = db.Column(db.String(30), nullable=True)

    minPlayers = db.Column(db.Integer, nullable=False)
    maxPlayers = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # in minutes

    category = db.relationship("Category", back_populates="boardGame")

    def __json__(self):
        return ['idBoardgame', 'name', 'difficulty', 'picture', 'minPlayers', 'maxPlayers', 'duration', 'category']

