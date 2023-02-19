from controller import app
from model.path.games_model import games_model


# pagination with [start, end]
@app.get("/games/<int:start>/<int:end>")
def get_games(start: int, end: int):
    return games_model(start, end)


@app.post("/game")
def post_game():
    return 'void'
