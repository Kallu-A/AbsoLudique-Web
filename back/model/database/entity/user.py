from flask_jwt_extended import get_jwt_identity

from setup_sql import db


# Category of board games
class User(db.Model):
    __tablename__ = "user"

    idUser = db.Column(db.String(100), primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    admin = db.Column(db.Boolean, nullable=False)

    def get_id(self):
        return self.idUser

    @staticmethod
    def is_active():
        return False

    @staticmethod
    def is_authenticated():
        return True


def get_user(id_user: int) -> User or None:
    return User.query.filter(User.idUser == id_user).first()


# only call in a jwt_required path
def is_admin_jwt():
    user_id = get_jwt_identity()
    user = get_user(user_id)
    return user.admin
