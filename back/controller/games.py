from flask import request
from flask_cors import cross_origin
from flask_login import login_required

from controller import app
from model.path.games_model import games_model, games_filter_model, game_id, post_game_model


# pagination with [cursor, cursor + limit]
# filter args are:
# - players, difficulty, duration, variation, name
@app.get("/games")
@login_required
@cross_origin()
def get_games() -> list:
    args = request.args
    cursor = args.get('cursor', type=int)
    limit = args.get('limit', type=int)

    players = args.get('players', type=int, default=None)
    difficulty = args.get('difficulty', type=int, default=None)
    duration = args.get('duration', type=int, default=None)
    variation = args.get('variation', type=float, default=None)
    name = args.get('name', type=str, default=None)

    category = args.get('category', type=str, default=None)

    if name == '':
        name = None
    if players is None and difficulty is None and duration is None \
            and variation is None and name is None and category is None:
        return games_model(cursor, limit)

    return games_filter_model(cursor, limit, players, difficulty, duration, variation, name, category)


# get only one game by id
@app.get("/game/<int:id_game>")
@login_required
def get_game_id(id_game: int) -> list:
    return game_id(id_game)


# post a game with value in
# request.form as data & file
@app.post("/game")
@login_required
def post_game():
    return post_game_model()
