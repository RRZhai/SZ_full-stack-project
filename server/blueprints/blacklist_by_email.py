from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.blacklist import Blacklist
from schemas.user_schema import UserSchema

blacklist_schema = UserSchema()
blacklist_by_email_bp = Blueprint("blacklist_by_email", __name__, 
                                    url_prefix="/blacklist/<string:username>")

class BlacklistByEmail(Resource):
    def get(self, email):
        if blacklist := Blacklist.query.filter(Blacklist.email == email).first(): 
            return make_response(blacklist_schema.dump(blacklist), 200)
        return make_response({"error": "User not found"}, 404)
    
# This need to consider checking if the user is in the blacklist