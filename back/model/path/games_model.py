import json

from flask import request, Response

import logger
from model.database.entity.boardgame import Boardgame
from model.database.enum.CategoryValue import CategoryValue
from model.database.enum.Difficulty import Difficulty
from model.database.schema.boardgame_schema import BoardgameSchema
from model.database.upload import upload_file, delete_file
from setup_sql import db


# return a game with the id
# or else return response 404
def game_id(id_game: int) -> list or Response:
    boardgame_schema = BoardgameSchema()
    boardgame = Boardgame.query.filter(Boardgame.idBoardgame == id_game).first()
    if boardgame is None:
        logger.LOGGER.warning('Boardgame don\'t exist id:%i - 404', id_game)
        return Response("Boardgame with id:" + str(id_game) + " doesn't exist", status=404)
    return boardgame_schema.dump(boardgame)


# delete a game with the id
# or else return response 404
def delete_game_id_model(id_game: int) -> Response:
    boardgame = Boardgame.query.filter(Boardgame.idBoardgame == id_game).first()
    if boardgame is None:
        logger.LOGGER.warning('Boardgame don\'t exist id:%i - 404', id_game)
        return Response("Boardgame with id:" + str(id_game) + " doesn't exist", status=404)

    id_boardgame = boardgame.idBoardgame
    db.session.delete(boardgame)
    db.session.commit()
    delete_file('', str(id_boardgame))

    return Response("Boardgame with id:" + str(id_game) + " deleted", status=200)


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

    variation = 0.3 if variation is None else variation
    integerDelay = 2

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
            .filter(duration - duration * variation - integerDelay <= Boardgame.duration)\
            .filter(duration + duration * variation + integerDelay >= Boardgame.duration)

    if name is not None:
        build_query = build_query\
            .filter(Boardgame.name.like("%{}%".format(name)))

    if category_str is not None and category_str != '':
        if category_str.find('/') != -1:
            for category_val in map(lambda value: CategoryValue(int(value)), category_str.split('/')):
                build_query = build_query.filter(Boardgame.category.any(category=category_val))
        else:
            print(category_str)
            build_query = build_query.filter(Boardgame.category.any(category=CategoryValue(int(category_str))))

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
# make sur all fields are in the json in request.form['data']
# return Response if something goes wrong
def post_game_model():
    try:
        data = json.loads(request.form['data'])
    except json.decoder.JSONDecodeError:
        logger.LOGGER.warning('Json invalid - 412')
        return Response("Json invalid", status=412)

    msg = " parameter not found"

    name = data.get('name')
    state = data.get('state')
    description = data.get('description')
    difficulty_value = data.get('difficulty')
    min_players = data.get('minPlayers')
    max_players = data.get('maxPlayers')
    duration = data.get('duration')

    if name is None:
        return Response("name" + msg, status=412)
    if state is None:
        return Response("state" + msg, status=412)
    if description is None:
        return Response("description" + msg, status=412)
    if difficulty_value is None:
        return Response("difficulty" + msg, status=412)
    if min_players is None:
        return Response("minPlayers" + msg, status=412)
    if max_players is None:
        return Response("maxPlayers" + msg, status=412)
    if duration is None:
        return Response("duration" + msg, status=412)

    try:
        difficulty = Difficulty(int(difficulty_value))
    except ValueError:
        logger.LOGGER.warning('difficulty ' + str(difficulty_value) + ' is not a valid difficulty - 406')
        return Response('difficulty ' + str(difficulty_value) + ' is not a valid difficulty', status=406)

    try:
        min_players = int(min_players)
    except (TypeError, ValueError):
        logger.LOGGER.warning('minPlayers is not a integer - 412')
        return Response("minPlayers is not a integer", status=412)
    try:
        max_players = int(max_players)
    except (TypeError, ValueError):
        logger.LOGGER.warning('maxPlayers is not a integer - 412')
        return Response("maxPlayers is not a integer", status=412)
    try:
        duration = int(duration)
    except (TypeError, ValueError):
        logger.LOGGER.warning('duration is not a integer - 412')
        return Response("duration is not a integer", status=412)

    boardgame = Boardgame(name=name, state=state, description=description,
                          difficulty=difficulty, minPlayers=min_players, maxPlayers=max_players,
                          duration=duration)

    db.session.add(boardgame)
    db.session.commit()
    logger.LOGGER.info('save of the game done - 200 ')
    boardgame.picture = boardgame.idBoardgame
    [success, msg] = upload_file(request, '', str(boardgame.idBoardgame))
    if not success:
        logger.LOGGER.warning('unable to upload the picture - 200 ')
        return Response(msg, status=412)

    db.session.commit()
    logger.LOGGER.info('upload of the picture done - 200 ')

    return str(boardgame.idBoardgame)


# put a game in database
# make sur all fields are in the json in request.form['data']
# return Response if something goes wrong
def put_game_model():
    try:
        data = json.loads(request.form['data'])
    except json.decoder.JSONDecodeError:
        logger.LOGGER.warning('Json invalid - 412')
        return Response("Json invalid", status=412)

    msg = " parameter not found"

    name = data.get('name')
    idBoardgame = data.get('idBoardgame')
    state = data.get('state')
    description = data.get('description')
    difficulty_value = data.get('difficulty')
    min_players = data.get('minPlayers')
    max_players = data.get('maxPlayers')
    duration = data.get('duration')

    if idBoardgame is None:
        return Response("idBoardgame" + msg, status=412)
    if name is None:
        return Response("name" + msg, status=412)
    if state is None:
        return Response("state" + msg, status=412)
    if description is None:
        return Response("description" + msg, status=412)
    if difficulty_value is None:
        return Response("difficulty" + msg, status=412)
    if min_players is None:
        return Response("minPlayers" + msg, status=412)
    if max_players is None:
        return Response("maxPlayers" + msg, status=412)
    if duration is None:
        return Response("duration" + msg, status=412)

    try:
        difficulty = Difficulty(int(difficulty_value))
    except ValueError:
        logger.LOGGER.warning('difficulty ' + str(difficulty_value) + ' is not a valid difficulty - 406')
        return Response('difficulty ' + str(difficulty_value) + ' is not a valid difficulty', status=406)

    try:
        min_players = int(min_players)
    except (TypeError, ValueError):
        logger.LOGGER.warning('minPlayers is not a integer - 412')
        return Response("minPlayers is not a integer", status=412)
    try:
        max_players = int(max_players)
    except (TypeError, ValueError):
        logger.LOGGER.warning('maxPlayers is not a integer - 412')
        return Response("maxPlayers is not a integer", status=412)
    try:
        duration = int(duration)
    except (TypeError, ValueError):
        logger.LOGGER.warning('duration is not a integer - 412')
        return Response("duration is not a integer", status=412)

    boardgame = Boardgame.query.filter(Boardgame.idBoardgame == idBoardgame).first()
    if boardgame is None:
        logger.LOGGER.warning('idBoardgame ' + str(idBoardgame) + ' is not a valid idBoardgame - 406')
        return Response('idBoardgame ' + str(idBoardgame) + ' is not a existing boardgame', status=406)

    boardgame.name = name
    boardgame.state = state
    boardgame.description = description
    boardgame.difficulty = difficulty
    boardgame.minPlayers = min_players
    boardgame.maxPlayers = max_players
    boardgame.duration = duration

    db.session.add(boardgame)
    db.session.commit()
    logger.LOGGER.info('put of the game done - 200 ')
    boardgame.picture = boardgame.idBoardgame
    [success, msg] = upload_file(request, '', str(boardgame.idBoardgame))
    if not success:
        logger.LOGGER.warning('put without new picture - 200 ')

    db.session.commit()
    logger.LOGGER.info('upload of the picture done - 200 ')

    return str(boardgame.idBoardgame)
