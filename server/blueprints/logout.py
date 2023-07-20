from blueprints import request, session, Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User
from flask_jwt_extended import (
    unset_jwt_cookies
)

logout_bp = Blueprint("logout", __name__, url_prefix="/logout")

class Logout(Resource):
    def post(self): 
        session['user_id'] = None
        return make_response({}, 204)
