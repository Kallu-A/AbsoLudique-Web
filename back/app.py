import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from oauthlib.oauth2 import WebApplicationClient

import controller
from logger import logger_config
from setup_sql import database_path_test, database_path, db

from flask_jwt_extended import JWTManager

# To find the root of the project everywhere
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv()
DURATION_TOKEN = os.getenv('DURATION_TOKEN')
SIZE_LIMIT_MO_UPLOAD = int(os.getenv('SIZE_UPLOAD_LIMIT_FILE'))
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')
STATIC = os.getenv('STATIC_FOLDER')
SECRET_KEY = os.getenv('SECRET_KEY')
ORIGIN_DEV = os.getenv('ORIGINS_DEV')
ORIGIN_OAUTH = os.getenv('ORIGINS_OAUTH')
FRONT_URI = os.getenv('FRONT_URI')

cors_header = ["Content-Type", "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"]

assert SIZE_LIMIT_MO_UPLOAD is not None
assert UPLOAD_FOLDER is not None
assert STATIC is not None
assert SECRET_KEY is not None
assert ORIGIN_DEV is not None
assert ORIGIN_OAUTH is not None
assert DURATION_TOKEN is not None

load_dotenv(Path('.secret'))
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_DISCOVERY_URL = os.getenv('GOOGLE_DISCOVERY_URL')

assert GOOGLE_CLIENT_ID is not None
assert GOOGLE_CLIENT_SECRET is not None
assert GOOGLE_DISCOVERY_URL is not None

client = WebApplicationClient(GOOGLE_CLIENT_ID)


def create_app(test=False):
    load_dotenv()

    if test:
        db_path = 'sqlite://' + database_path_test
    else:
        db_path = 'sqlite://' + database_path

    # config the app to make app.py the start point but the actual program is one directory lower
    app_intern = Flask(__name__,
                       static_folder=STATIC)
    app_intern.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app_intern.config['JWT_SECRET_KEY'] = SECRET_KEY
    app_intern.config['CORS_HEADERS'] = cors_header
    app_intern.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app_intern.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=float(DURATION_TOKEN))
    app_intern.config['MAX_CONTENT_LENGTH'] = SIZE_LIMIT_MO_UPLOAD * 1024 * 1024

    logger_config()
    app_intern.register_blueprint(controller.app)

    CORS(app_intern, origins=[ORIGIN_DEV, ORIGIN_OAUTH, FRONT_URI])
    #CORS(app_intern, origins='*')

    jwt = JWTManager(app_intern)

    # database init
    db.init_app(app_intern)
    with app_intern.app_context():
        db.create_all()

    app_intern.logger.info("Start of the server with: "
                           "\n- SQLALCHEMY_DATABASE_URI = '" + db_path +
                           "'\n- CORS_HEADERS = '" + str(cors_header) +
                           "'\n- UPLOAD_FOLDER = '" + UPLOAD_FOLDER +
                           "'\n- MAX_CONTENT_LENGTH = '" + str(SIZE_LIMIT_MO_UPLOAD) + "mo" +
                           "'\n- CORS = '" + ORIGIN_DEV + ", " + ORIGIN_OAUTH + "'"
                           )
    return app_intern


if __name__ == '__main__':
    load_dotenv()

    HOST = os.getenv('HOST')
    PORT = os.getenv('PORT')

    app = create_app()
    app.run(port=PORT, host=HOST, ssl_context=('cert/abso.pem', 'cert/abso.key'))
