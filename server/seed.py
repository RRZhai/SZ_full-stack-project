#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from faker.providers import BaseProvider

# Local imports
from app import app
from models import db

from models.user import User
from models.job import Job
from models.review import Review
from models.blacklist import Blacklist

if __name__ == '__main__':
    fake = Faker(locale='en_US')
    with app.app_context():
        print("Deleting all records ...")
        User.query.delete()
        Job.query.delete()
        Review.query.delete()
        Blacklist.query.delete()

        print("Creating users ...")
        class ListProvider(BaseProvider):
            def random_from_list(self, role_list):
                return self.random_element(role_list)
        fake.add_provider(ListProvider)
        role_list = ['employer', 'job seeker']
        
        users = []
        for _ in range(10):
            user = User(
                email=fake.email(),
                email=fake.email(),
                name=fake.name(),
                bio=fake.text(),
                profile_pic_url=fake.url(),
                role=fake.fake.random_from_list(role_list)
            )
            users.append(user)
        db.session.add_all(users)
        
        print("Starting seed...")
        # Seed code goes here!
