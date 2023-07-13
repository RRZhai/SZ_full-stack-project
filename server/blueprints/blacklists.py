from blueprints import session, request, Resource, Blueprint, make_response, g, abort 
from models import db
from models.blacklist import Blacklist
from schemas.blacklist_schema import BlacklistSchema

blacklists_schema = BlacklistSchema()
blacklists_bp = Blueprint("blacklists", __name__, url_prefix="/blacklists")


class Blacklists(Resource):
    def get(self):
        blacklists = blacklists_schema.dump(Blacklist.query.all())
        return make_response(blacklists, 200)

# This need to consider checking if the user is in the blacklist