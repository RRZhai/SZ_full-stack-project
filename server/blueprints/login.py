from blueprints import Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User
from flask import Flask, session, request

login_bp = Blueprint("login", __name__, url_prefix="/login")

class Login(Resource):
    def post(self): 
        try:
            data = request.get_json()
            
            email = data.get('email')
            password = data.get('password')
            if user := User.query.filter(User.email == email).first():
                if user.authenticate(password):
                    session['user_id'] = user.id
                    import ipdb; ipdb.set_trace()
                    return make_response(user_schema.dump(user), 200)
        except: 
            return make_response({'error': 'Invalid credentials'}, 401) 