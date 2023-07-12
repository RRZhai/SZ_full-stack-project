from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.user import User
from schemas.user_schema import UserSchema

users_schema = UserSchema(many=True)
users_bp = Blueprint("users", __name__, url_prefix="/users")

class Users(Resource):
    def get(self):
        users = users_schema.dump(User.query.all())
        return make_response(users, 200)