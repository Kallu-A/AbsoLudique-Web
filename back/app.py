import os

from dotenv import load_dotenv
from flask import Flask

import controller
from logger import logger_config
from setup_sql import database_path_test, database_path, db

# To find the root of the project everywhere
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# do not remove this import allows SQLAlchemy to find the table
from model.database.entity import boardgame, category



def create_app(test=False):
    load_dotenv()

    if test:
        db_path = 'sqlite://' + database_path_test
    else:
        db_path = 'sqlite://' + database_path

    size_limit_mo_upload = os.getenv('SIZE_UPLOAD_LIMIT_FILE')
    upload_folder = os.getenv('UPLOAD_FOLDER')
    static = os.getenv('STATIC_FOLDER')
    secret_key = os.getenv('SECRET_KEY')

    # config the app to make app.py the start point but the actual program is one directory lower
    app_intern = Flask(__name__,
                       static_folder=static)
    app_intern.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app_intern.config['SECRET_KEY'] = secret_key
    app_intern.config['UPLOAD_FOLDER'] = upload_folder
    app_intern.config['MAX_CONTENT_LENGTH'] = size_limit_mo_upload * 1024 * 1024

    logger_config()
    app_intern.register_blueprint(controller.app)

    db.init_app(app_intern)
    with app_intern.app_context():
        db.create_all()

    app_intern.logger.info("Start of the server")
    return app_intern


if __name__ == '__main__':
    load_dotenv()

    HOST = os.getenv('HOST')
    PORT = os.getenv('PORT')

    app = create_app()
    app.run(port=PORT, host=HOST)
