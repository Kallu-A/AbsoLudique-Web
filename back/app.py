import os

from flask import Flask

from back import controller
from back.setup_sql import database_path_test, database_path, db

# To find the root of the project everywhere
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# To restrict the format of file being upload
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
UPLOAD_FOLDER = 'jardiquest/static/upload'


# create the flask app (useful to be separate from the app.py
# to be used in the test and to put all the code in the jardiquest folder
def create_app(test=False):
    if test:
        db_path = 'sqlite://' + database_path_test
    else:
        db_path = 'sqlite://' + database_path

    size_limit_mo = 10

    # config the app to make app.py the start point but the actual program is one directory lower
    app = Flask(__name__,
                static_folder="static",
                template_folder='view')

    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SECRET_KEY'] = '=xyb3y=2+z-kd!3rit)hfrg0j!e!oggyny0$5bliwlb8v76j'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = size_limit_mo * 1024 * 1024

    app.register_blueprint(controller.app)
    # flask_serv_intern.register_error_handler(HTTPException, handling_status_error)
    db.init_app(app)
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    flask_serv = create_app()
