from flask_login import login_required

from controller import app
from model.path.auth_model import login_model, login_callback_model, logout_model


@app.route("/login")
def login():
    return login_model()


@app.route("/login/callback")
def login_callback():
    return login_callback_model()


@app.route("/logout")
@login_required
def logout():
    return logout_model()
