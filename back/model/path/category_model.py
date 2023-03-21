from flask import Response

import logger
from model.database.entity.boardgame import Boardgame
from model.database.entity.category import Category
from model.database.enum.CategoryValue import CategoryValue
from setup_sql import db


# Post a category in database with the idBoardgame a id_game and value of the category as category_value
def post_category_model(id_game: int, category_value: int):
    boardgame = Boardgame.query.filter(Boardgame.idBoardgame == id_game).first()
    if boardgame is None:
        logger.LOGGER.warning('Boardgame don\' exist id:%i - 404', id_game)
        return Response("Boardgame with id:" + str(id_game) + " doesn't exist", status=404)

    try:
        category_type = CategoryValue(int(category_value))
    except ValueError:
        logger.LOGGER.warning('category ' + str(category_value) + ' is not a valid category - 406')
        return Response('category ' + str(category_value) + ' is not a valid category', status=406)

    category = Category(idBoardGame=id_game, category=category_type)
    db.session.add(category)
    db.session.commit()
    logger.LOGGER.info('save of the game done - 200 ')

    return str(category.idCategory)


def put_category_model(id_game: int, category_value: int):
    boardgame = Boardgame.query.filter(Boardgame.idBoardgame == id_game).first()
    if boardgame is None:
        logger.LOGGER.warning('Boardgame don\' exist id:%i - 404', id_game)
        return Response("Boardgame with id:" + str(id_game) + " doesn't exist", status=404)

    try:
        category_type = CategoryValue(int(category_value))
    except ValueError:
        logger.LOGGER.warning('category ' + str(category_value) + ' is not a valid category - 406')
        return Response('category ' + str(category_value) + ' is not a valid category', status=406)

    category = Category.query.filter(Category.idBoardGame == id_game, Category.category == category_type).first()
    if category is None:
        category = Category(idBoardGame=id_game, category=category_type)
        db.session.add(category)
        db.session.commit()
        logger.LOGGER.info('save of the game done - 200 ')
        return str(category.idCategory)
    else:
        db.session.delete(category)
        db.session.commit()
        logger.LOGGER.info('delete of the category done - 200 ')
        return 'delete of the category done'
