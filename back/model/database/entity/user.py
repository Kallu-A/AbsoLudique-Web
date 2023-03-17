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
