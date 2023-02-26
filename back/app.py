import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from oauthlib.oauth2 import WebApplicationClient

import controller
from logger import logger_config
from model.database.entity.user import User
from setup_sql import database_path_test, database_path, db

# To find the root of the project everywhere
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# do not remove this import allows SQLAlchemy to find the table
from model.database.entity import boardgame, category, user

# secret Google
load_dotenv(Path('.secret'))
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_DISCOVERY_URL = os.getenv('GOOGLE_DISCOVERY_URL')
client = WebApplicationClient(GOOGLE_CLIENT_ID)


def create_app(test=False):
    load_dotenv()

    if test:
        db_path = 'sqlite://' + database_path_test
    else:
        db_path = 'sqlite://' + database_path

    size_limit_mo_upload = int(os.getenv('SIZE_UPLOAD_LIMIT_FILE'))
    upload_folder = os.getenv('UPLOAD_FOLDER')
    static = os.getenv('STATIC_FOLDER')
    secret_key = os.getenv('SECRET_KEY')
    origins_dev = os.getenv('ORIGINS_DEV')
    origins_oauth = os.getenv('ORIGINS_OAUTH')
    cors_header = ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"]

    # config the app to make app.py the start point but the actual program is one directory lower
    app_intern = Flask(__name__,
                       static_folder=static)
    app_intern.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app_intern.config['SECRET_KEY'] = secret_key
    app_intern.config['CORS_HEADERS'] = cors_header
    app_intern.config['UPLOAD_FOLDER'] = upload_folder
    app_intern.config['MAX_CONTENT_LENGTH'] = size_limit_mo_upload * 1024 * 1024

    logger_config()
    app_intern.register_blueprint(controller.app)

    CORS(app_intern, origins=[origins_dev, origins_oauth])

    # login
    login_manager = LoginManager()
    login_manager.init_app(app_intern)

    # database init
    db.init_app(app_intern)
    with app_intern.app_context():
        db.create_all()

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    @login_manager.unauthorized_handler
    def unauthorized():
        return "You must be logged in to access this content.", 403

    app_intern.logger.info("Start of the server with: "
                           "\n- SQLALCHEMY_DATABASE_URI = '" + db_path +
                           "'\n- CORS_HEADERS = '" + str(cors_header) +
                           "'\n- UPLOAD_FOLDER = '" + upload_folder +
                           "'\n- MAX_CONTENT_LENGTH = '" + str(size_limit_mo_upload) + "mo" +
                           "'\n- CORS = '" + origins_dev + ", " + origins_oauth + "'"
                           )
    return app_intern


if __name__ == '__main__':
    load_dotenv()

    HOST = os.getenv('HOST')
    PORT = os.getenv('PORT')

    app = create_app()
    app.run(port=PORT, host=HOST)
