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




if __name__ == '__main__':
    app.run(port=5555, debug=True)
