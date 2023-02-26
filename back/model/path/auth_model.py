import datetime
import json

import jwt
import requests
from flask import request
from flask_login import logout_user

from app import GOOGLE_DISCOVERY_URL, client, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DURATION_TOKEN
from controller import app
from model.database.entity.user import User
from setup_sql import db


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


def login_model():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return {"url": request_uri}


def login_callback_model():
    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        users_firstname = userinfo_response.json()["given_name"]
        users_lastname = userinfo_response.json()["family_name"]
    else:
        return "User email not available or not verified by Google.", 400

    user = User.query.filter(User.idUser == unique_id).first()
    if user is None:
        user = User(idUser=unique_id, firstname=users_firstname, lastname=users_lastname, email=users_email)
        db.session.add(user)
        db.session.commit()

    token = jwt.encode({'id': user.idUser,
                        'email': user.email,
                        'firstname': user.firstname,
                        'lastname': user.lastname,
                        'expiration': datetime.datetime.utcnow() + datetime.timedelta(hours=DURATION_TOKEN)},
                       app.config['SECRET_KEY'], "HS256")

    return token, 200


def logout_model():
    logout_user()
    return "Successfully logged out", 200
