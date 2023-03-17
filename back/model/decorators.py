from functools import wraps

from flask import current_app

from model.database.entity.user import is_admin_jwt


# only use after the decorate @jwt_required()
# example of using it
# @jwt_required()
# @account_admin()
# if you use account_admin() before jwt_required it doesn't work
def account_admin() -> any:
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            admin = is_admin_jwt()
            print(admin)
            if not admin:
                print('not a admin')
                return "Unauthorized: not a admin account"
            print("is admin")
            return current_app.ensure_sync(fn)(*args, **kwargs)

        return decorator
    return wrapper
