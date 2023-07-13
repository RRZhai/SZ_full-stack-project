#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

from models.user import User
from models.job import Job
from models.review import Review
from models.blacklist import Blacklist
from models.hire import Hire

from blueprints.blacklists import Blacklists
from blueprints.check_session import CheckSession
from blueprints.hire_by_id import HireById
from blueprints.hires import Hires
from blueprints.job_by_id import JobById
from blueprints.jobs import Jobs
from blueprints.login import Login
from blueprints.logout import Logout
from blueprints.review_by_id import ReviewById
from blueprints.reviews import Reviews
from blueprints.signup import Signup
from blueprints.user_by_email import UserByEmail
from blueprints.user_by_id import UserById
from blueprints.users import Users

api.add_resource(Blacklists, "/blacklists")
api.add_resource(CheckSession, "/checksession") 
api.add_resource(HireById, "/hires/<int:id>")
api.add_resource(Hires, "/hires")
api.add_resource(JobById, "/jobs/<int:id>")
api.add_resource(Jobs, "/jobs")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(ReviewById, "/reviews/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(Signup, "/signup")
api.add_resource(UserByEmail, "/users/<string:email>")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Users, "/users")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
