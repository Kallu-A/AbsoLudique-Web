import json

from flask import request

from model.database.entity.boardgame import Boardgame, Difficulty
from model.database.entity.category import CategoryValue
from model.database.schema.boardgame_schema import BoardgameSchema
from model.database.upload import upload_file
from setup_sql import db


# game with a id
def game_id(id_game: int) -> list:
    boardgame_schema = BoardgameSchema()
    return boardgame_schema.dump(Boardgame.query.filter(Boardgame.idBoardgame == id_game).first())


# basic pagination without filter
def games_model(cursor: int, limit: int) -> list:
    boards: list = Boardgame.query.filter(Boardgame.idBoardgame >= cursor)\
        .filter(Boardgame.idBoardgame < cursor + limit).all()
    boardgame_schema = BoardgameSchema()

    for i in range(len(boards)):
        boards[i] = boardgame_schema.dump(boards[i])

    return boards


# pagination with filter
def games_filter_model(cursor: int, limit: int, players: int, difficulty: int,
                       duration: int, variation: float, name: str, category_str: str) -> list:

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


# post a game in database
def post_game_model():
    data = json.loads(request.form['data'])

    msg = " parameter not found"

    name = data.get('name')
    state = data.get('state')
    description = data.get('description')
    difficulty = data.get('difficulty')
    min_players = data.get('minPlayers')
    max_players = data.get('maxPlayers')
    duration = data.get('duration')

    if name is None:
        return "name" + msg
    if state is None:
        return "state" + msg
    if description is None:
        return "description" + msg
    if difficulty is None:
        return "difficulty" + msg
    if min_players is None:
        return "minPlayers" + msg
    if max_players is None:
        return "maxPlayers" + msg
    if duration is None:
        return "duration" + msg

    difficulty = Difficulty(difficulty)

    boardgame = Boardgame(name=name, state=state, description=description,
                          difficulty=difficulty, minPlayers=min_players, maxPlayers=max_players,
                          duration=duration)

    db.session.add(boardgame)
    db.session.commit()

    boardgame.picture = boardgame.idBoardgame
    [success, msg] = upload_file(request, '', str(boardgame.idBoardgame))
    if not success:
        return msg

    db.session.commit()

    return str(boardgame.idBoardgame)
