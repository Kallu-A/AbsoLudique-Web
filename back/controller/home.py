from back.controller import app
from back.model.path.home_model import home_model


@app.get("/")
def home():

    return home_model()
