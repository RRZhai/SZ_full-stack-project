from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.user import User
from schemas.user_schema import UserSchema

user_schema = UserSchema()
user_by_name_bp = Blueprint("user_by_name", __name__, 
                                    url_prefix="/users/<string:username>")

class UserByEmail(Resource):
    def get(self, email):
        if user := User.query.filter(User.email == email).first(): 
            return make_response(user_schema.dump(user), 200)
        return make_response({"error": "User not found"}, 404)