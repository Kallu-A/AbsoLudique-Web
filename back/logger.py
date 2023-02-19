from logging.config import dictConfig

from flask import current_app
from werkzeug.local import LocalProxy

logger = LocalProxy(lambda: current_app.logger)


def logger_config():
    dictConfig({
        'version': 1,
        'formatters': {
            'default': {
                'format': '[ %(levelname)s | %(asctime)s | %(threadName)s | %(module)s ] - %(message)s',
            }
        },
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'formatter': 'default',
            },
            'file': {
                'class': 'logging.FileHandler',
                'filename': "logs/absoludique_web.log",
                'formatter': 'default',
            },
        },
        'root': {
            'level': "INFO",
            'handlers': ['console', 'file']
        }
    })
