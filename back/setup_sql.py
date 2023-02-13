import os

from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

load_dotenv()

database_path = os.getenv('DATABASE_PATH')
database_path_test = os.getenv('DATABASE_PATH_TEST')
