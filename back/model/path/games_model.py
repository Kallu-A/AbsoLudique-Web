from model.database.entity.boardgame import Boardgame
from model.database.schema.boardgame_schema import BoardgameSchema


def games_model(cursor: int, limit: int):
    boards: list = Boardgame.query.filter(Boardgame.idBoardgame >= cursor)\
        .filter(Boardgame.idBoardgame < cursor + limit).all()
    boardgame_schema = BoardgameSchema()

    for i in range(len(boards)):
        boards[i] = boardgame_schema.dump(boards[i])

    return boards
