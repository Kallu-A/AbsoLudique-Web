from flask import request
from controller import app
from model.path.games_model import games_model, games_filter_model, game_id


# pagination with [cursor, cursor + limit]
# filter args are:
# - players, difficulty, duration, variation, name
@app.get("/games")
def get_games():
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


@app.get("/game/<int:id_game>")
def get_game_id(id_game: int):
    return game_id(id_game)


@app.post("/game")
def post_game():
    return 'void'
