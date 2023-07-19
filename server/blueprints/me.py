from blueprints import (
    session, 
    Blueprint, 
    make_response, 
)

from models import db
from models.user import User
from blueprints.user_by_id import user_schema

me_bp = Blueprint("me", __name__)
@me_bp.route("/me")
def me():
    if id_ := session.get("user_id"):
        if user := db.session.get(User, id_):
            return make_response({"user": user_schema.dump(user)}, 200)
    return {}