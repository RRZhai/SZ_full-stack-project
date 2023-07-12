from blueprints import session, request, Resource, Blueprint, make_response, g, abort 
from blueprints.hire_by_id import job_schema
from models import db
from models.hire import Hire
from models.user import User
from schemas.hire_schema import hireSchema

hires_schema = hireSchema(many=True)
hires_bp = Blueprint("hires", __name__, url_prefix="/hires")

class hires(Resource):
    def get(self):
        hires = hires_schema.dumphirere.query.order_by(hire.created_at.desc()).all()
        return make_response(hires, 200)
    
    def post(self):
        try:
            data = request.get_json()
            content = data.get("content")

            if id := session.get("user_id"):
                current_user = db.session.get(User, id)

                new_hire = hire(content=content)
                new_hire.user = current_user

                hires_schema.validate(new_hire)

                db.session.add(new_hire)
                db.session.commit()
                
                return make_response(hires_schema.dump(new_hire), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)