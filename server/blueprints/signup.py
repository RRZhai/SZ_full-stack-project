from random import randint
from blueprints import request, Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User
from flask import Flask, session
from flask_jwt_extended import (
    create_access_token, 
    create_refresh_token, 
    set_access_cookies,
    set_refresh_cookies,
)



signup_bp = Blueprint("signup", __name__, url_prefix="/signup")

class Signup(Resource):
    def post(self): 
        try: 
            data = request.get_json()

            email = data.get("email")
            name = data.get("name")
            password = data.get("password")

            if User.query.filter(User.email == email).first(): 
                return make_response({"error": "Email must be unique"}, 400)

            new_user = User(email=email, name=name)
            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id 

            token = create_access_token(identity=new_user.id)
            refresh_token = create_refresh_token(identity=new_user.id)
            response = make_response({'user': user_schema.dump(new_user)}, 201)

            set_access_cookies(response, token)
            set_refresh_cookies(response, refresh_token)

            return response
        except Exception as e: 
            return make_response({"error": [str(e)]}, 400)