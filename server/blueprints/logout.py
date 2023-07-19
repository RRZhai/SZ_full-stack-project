from blueprints import request, session, Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User
from flask_jwt_extended import (
    unset_jwt_cookies
)

logout_bp = Blueprint("logout", __name__, url_prefix="/logout")

class Logout(Resource):
    def delete(self): 
        if session.get('user_id'):
            response = make_response({}, 204)
            unset_jwt_cookies(response)
            return response
        return make_response({'error': 'Unauthorized'}, 401)