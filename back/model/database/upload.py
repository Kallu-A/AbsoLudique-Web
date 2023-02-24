import os

from dotenv import load_dotenv
from flask import flash

load_dotenv()
ALLOWED_EXTENSIONS = os.getenv('ALLOWED_EXTENSIONS')
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')


# upload a file if is in the allowed_file()
def upload_file(request, path, filename_stored) -> [bool, str] or bool:
    if 'file' not in request.files:
        return [False, "file not found"]
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        return [False, "File not selected"]

    if file and allowed_file(file.filename):
        if path == '':
            file.save(os.path.join(UPLOAD_FOLDER, filename_stored))
        else:
            file.save(os.path.join(UPLOAD_FOLDER, path, filename_stored))
        return [True, 'File uploaded']
    return [False, 'File extension not allowed']


def delete_file(path, filename) -> None:
    os.remove(os.path.join(path, filename))


def file_exist(path, filename) -> bool:
    return os.path.isfile(os.path.join(path, filename))


# Return if the extension of the file is in ALLOWED_EXTENSIONS
def allowed_file(filename) -> bool:
    return '.' in filename \
        and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
