from model.database.entity.boardgame import Boardgame, Difficulty
from model.database.entity.category import CategoryValue
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
                       duration: int, variation: float, name: str, category_str: str):

    variation = 0.2 if variation is None else variation

    build_query = Boardgame.query
    if players is not None:
        # min players and max players
        build_query = build_query\
            .filter(Boardgame.minPlayers <= players) \
            .filter(Boardgame.maxPlayers >= players)

    if difficulty is not None:
        build_query = build_query\
            .filter(Boardgame.difficulty == Difficulty(difficulty))

    if duration is not None:
        build_query = build_query\
            .filter(duration - duration * variation <= Boardgame.duration)\
            .filter(duration + duration * variation >= Boardgame.duration)

    if name is not None:
        build_query = build_query\
            .filter(Boardgame.name.like("%{}%".format(name)))

    if category_str is not None and category_str != '':
        for category_val in map(lambda value: CategoryValue( int(value) ).name, category_str.split('/')):
            build_query = build_query.filter(Boardgame.category.any(category=category_val))

    boards = build_query\
        .all()

    boardgame_schema = BoardgameSchema()

    games = []
    for i in range(cursor - 1, cursor - 1 + limit):
        if i < 0 or i >= len(boards):
            return games
        games.append(boardgame_schema.dump(boards[i]))

    return games
