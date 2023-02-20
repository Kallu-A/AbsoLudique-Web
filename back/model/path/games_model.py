from model.database.entity.boardgame import Boardgame, Difficulty
from model.database.schema.boardgame_schema import BoardgameSchema


# game with a id
def game_id(id_game: int):
    boardgame_schema = BoardgameSchema()
    return boardgame_schema.dump(Boardgame.query.filter(Boardgame.idBoardgame == id_game).first())


# basic pagination without filter
def games_model(cursor: int, limit: int):
    boards: list = Boardgame.query.filter(Boardgame.idBoardgame >= cursor)\
        .filter(Boardgame.idBoardgame < cursor + limit).all()
    boardgame_schema = BoardgameSchema()

    for i in range(len(boards)):
        boards[i] = boardgame_schema.dump(boards[i])

    return boards


# pagination with filter
def games_filter_model(cursor: int, limit: int, players: int, difficulty: int,
                       duration: int, variation: float, name: str):

    min_players_bool = True if players is None else Boardgame.minPlayers <= players
    max_players_bool = True if players is None else Boardgame.maxPlayers >= players
    difficulty_bool = True if difficulty is None else Boardgame.difficulty == Difficulty(difficulty)
    variation = 0.2 if variation is None else variation
    min_duration_bool = True if duration is None else duration - duration * variation <= Boardgame.duration
    max_duration_bool = True if duration is None else duration + duration * variation >= Boardgame.duration
    name_bool = True if name is None else Boardgame.name.like("%{}%".format(name))

    boards: list = Boardgame.query \
        .filter(min_players_bool)\
        .filter(max_players_bool)\
        .filter(difficulty_bool)\
        .filter(min_duration_bool)\
        .filter(max_duration_bool)\
        .filter(name_bool)\
        .all()
    boardgame_schema = BoardgameSchema()

    games = []
    for i in range(cursor - 1, cursor - 1 + limit):
        if i < 0 or i >= len(boards):
            return games
        games.append(boardgame_schema.dump(boards[i]))

    return games
