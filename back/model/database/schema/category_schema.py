from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow_enum import EnumField

from model.database.entity.category import Category, CategoryValue


class CategorySchema(SQLAlchemySchema):
    class Meta:
        model = Category
        include_relationships = True
        load_instance = True

    idCategory = auto_field()

    idBoardGame = auto_field()
    category = EnumField(CategoryValue, by_value=True)

