from random import randint
from blueprints import request, Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User
from flask import Flask, session



signup_bp = Blueprint("signup", __name__, url_prefix="/signup")

class Signup(Resource):
    def post(self): 
        try: 
            data = request.get_json()

            email = data.get("email")
            name = data.get("name")
            password = data.get("password")
            # import ipdb; ipdb.set_trace()

            if User.query.filter(User.email == email).first(): 
                return make_response({"error": "Email must be unique"}, 400)

            new_user = User(email=email, name=name, _password_hash=password)

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id 
            return make_response(user_schema.dump(new_user), 201)
        except Exception as e: 
            return make_response({"error": [str(e)]}, 400)