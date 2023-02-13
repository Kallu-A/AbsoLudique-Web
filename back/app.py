import os

from dotenv import load_dotenv
from flask import Flask

import controller
from setup_sql import database_path_test, database_path, db

# To find the root of the project everywhere
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


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
    app = Flask(__name__,
                static_folder=static)
    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SECRET_KEY'] = secret_key
    app.config['UPLOAD_FOLDER'] = upload_folder
    app.config['MAX_CONTENT_LENGTH'] = size_limit_mo_upload * 1024 * 1024

    app.register_blueprint(controller.app)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    load_dotenv()

    HOST = os.getenv('HOST')
    PORT = os.getenv('PORT')

    app = create_app()
    app.run(port=PORT, host=HOST)
