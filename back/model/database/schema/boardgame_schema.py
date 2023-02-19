from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow_enum import EnumField
from marshmallow import fields

from model.database.entity.boardgame import Boardgame, Difficulty
from model.database.schema.category_schema import CategorySchema


class BoardgameSchema(SQLAlchemySchema):
    class Meta:
        model = Boardgame
        include_relationships = True
        load_instance = True

    idBoardgame = auto_field()

    name = auto_field()
    description = auto_field()
    difficulty = EnumField(Difficulty, by_value=True)
    picture = auto_field()

    minPlayers = auto_field()
    maxPlayers = auto_field()
    duration = auto_field()

    category = fields.Nested(CategorySchema, many=True)

