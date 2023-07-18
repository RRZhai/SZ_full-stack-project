from blueprints import login_required, session, request, Resource, Blueprint, make_response, g, abort 
from models import db
from models.hire import Hire
from models.user import User
from schemas.hire_schema import HireSchema

hires_schema = HireSchema(many=True)
hires_bp = Blueprint("hires", __name__, url_prefix="/hires")

class Hires(Resource):
    def get(self):
        hires = hires_schema.dump(Hire.query.all())
        return make_response(hires, 200)
    
    @login_required
    def post(self):
        try:
            data = request.get_json()
            new_hire = Hire(**data)
        
            db.session.add(new_hire)
            # import ipdb; ipdb.set_trace()
            db.session.commit()
                
            return make_response(hires_schema.dump(new_hire), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)

