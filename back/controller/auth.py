from flask_jwt_extended import jwt_required

from controller import app
from model.path.auth_model import login_model, login_callback_model, logout_model, is_admin_model


@app.route("/login")
def login():
    return login_model()


@app.route("/login/callback")
def login_callback():
    return login_callback_model()


@app.route("/logout")
@jwt_required()
def logout():
    return logout_model()


@app.route("/verify/token")
@jwt_required()
def verify():
    return "true"


@app.route("/user/admin")
@jwt_required()
def is_admin():
    return is_admin_model()
