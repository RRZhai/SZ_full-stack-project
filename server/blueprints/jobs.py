from blueprints import login_required, session, request, Resource, Blueprint, make_response, g, abort 
from blueprints.job_by_id import job_schema
from models import db
from models.job import Job
from models.user import User
from schemas.job_schema import JobSchema

jobs_schema = JobSchema(many=True)
jobs_bp = Blueprint("jobs", __name__, url_prefix="/jobs")

class Jobs(Resource):
    def get(self):
        jobs = jobs_schema.dump(Job.query.order_by(Job.created_at.desc()).all())
        return make_response(jobs, 200)
    
    @login_required
    def post(self):
        try:
            data = request.get_json()
            content = data.get("content")

            if id := session.get("user_id"):
                current_user = db.session.get(User, id)

                new_job = Job(content=content)
                new_job.user = current_user

                job_schema.validate(new_job)

                db.session.add(new_job)
                db.session.commit()
                
                return make_response(job_schema.dump(new_job), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)