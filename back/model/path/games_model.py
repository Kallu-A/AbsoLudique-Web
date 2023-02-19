import json

from model.database.entity.boardgame import Boardgame


def games_model(start: int, end: int):
    boards: list = Boardgame.query.filter(Boardgame.idBoardgame >= start).filter(Boardgame.idBoardgame <= end).all()
    return boards.dump_to_json()
