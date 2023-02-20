import enum

from sqlalchemy import Enum

from setup_sql import db


class Difficulty(enum.Enum):

    easy = 1
    medium = 2
    hard = 3
    very_hard = 4


class Boardgame(db.Model):
    __tablename__ = "board_game"

    idBoardgame = db.Column(db.Integer, primary_key=True, autoincrement=True)

    name = db.Column(db.String(100), nullable=False)
    #state = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    difficulty = db.Column(Enum(Difficulty))
    picture = db.Column(db.String(30), nullable=False)

    minPlayers = db.Column(db.Integer, nullable=False)
    maxPlayers = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # in minutes

    category = db.relationship("Category", back_populates="boardGame")

    def __json__(self):
        return ['idBoardgame', 'name', 'difficulty', 'picture', 'minPlayers', 'maxPlayers', 'duration', 'category']

