from logging.config import dictConfig


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
