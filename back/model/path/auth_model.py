import json
import re

import requests
from flask import request, jsonify, redirect
from flask_jwt_extended import create_access_token, unset_jwt_cookies

from model.database.entity.user import User, get_user, is_admin_jwt
from setup_sql import db


def get_google_provider_cfg():
    from app import GOOGLE_DISCOVERY_URL
    return requests.get(GOOGLE_DISCOVERY_URL).json()


def login_model():
    from app import client

    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    redirect_callback = request.args.get("redirect_callback", default=None)
    if redirect_callback is None:
        redirect_callback_str = ''
    else:
        redirect_callback_str = "?redirect_callback=" + redirect_callback

    redirect_uri = request.base_url + "/callback"
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=redirect_uri + redirect_callback_str,
        scope=["openid", "email", "profile"],
    )
    return {"url": request_uri}


def login_callback_model():
    from app import client
    from app import GOOGLE_CLIENT_ID
    from app import GOOGLE_CLIENT_SECRET

    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    authorization_response = request.url

    redirect_callback = re.search(r"\?redirect_callback=.*&code=", request.url).group()
    redirect_callback = redirect_callback[0: len(redirect_callback) - 6]


    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=authorization_response,
        redirect_url=request.base_url,
        code=code,
    )

    token_response = requests.post(
        token_url,
        headers=headers,
        data=body + redirect_callback,
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

    user = get_user(unique_id)
    if user is None:
        user = User(idUser=unique_id, firstname=users_firstname,
                    lastname=users_lastname, email=users_email, admin=False)
        db.session.add(user)
        db.session.commit()

    token = create_access_token(identity=unique_id)

    redirect_callback = request.args.get("redirect_callback")
    return redirect(redirect_callback + "?token=" + token)


def logout_model():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return "Successfully logged out", 200


def is_admin_model():
    return str(is_admin_jwt())


