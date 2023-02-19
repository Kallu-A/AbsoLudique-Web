from flask import request

from controller import app
from model.path.games_model import games_model


# pagination with [cursor, cursor + limit[
@app.get("/games")
def get_games():
    args = request.args
    print(args)
    cursor = args.get('cursor', type=int)
    limit = args.get('limit', type=int)
    return games_model(cursor, limit)


@app.post("/game")
def post_game():
    return 'void'
