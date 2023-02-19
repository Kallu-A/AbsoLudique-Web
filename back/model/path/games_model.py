from model.database.entity.boardgame import Boardgame
from model.database.schema.boardgame_schema import BoardgameSchema


def games_model(start: int, end: int):
    boards: list = Boardgame.query.filter(Boardgame.idBoardgame >= start).filter(Boardgame.idBoardgame <= end).all()
    boardgame_schema = BoardgameSchema()

    for i in range(len(boards)):
        boards[i] = boardgame_schema.dump(boards[i])

    return boards
