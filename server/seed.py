#!/usr/bin/env python3

# Standard library imports
from random import choice as rc
from random import randint
import random
from datetime import date, time

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
from models.hire import Hire

if __name__ == '__main__':
    fake = Faker(locale='en_US')
    with app.app_context():
        print("Deleting all records ...")
        User.query.delete()
        Job.query.delete()
        Review.query.delete()
        Blacklist.query.delete()
        Hire.query.delete()

        print("Creating users ...")

        users = []
        for _ in range(10):
            user = User(
                email=fake.email(),
                _password_hash=fake.password(),
                name=fake.name(),
                bio=fake.text(),
                profile_pic_url=fake.url(),
            )
            users.append(user)
        db.session.add_all(users)
        
        print("Creating jobs...")

        job_list = ['Babysitting', 'House Cleaning', 'Tutoring', 'Dog Walking', 'Delivery Service', 'Event Staffing', 'Handyman Service', 'Modeling']
        jobs = []
        for _ in range(30):
            random_date = fake.date_between(start_date='-1y')
            random_time1 = fake.time_object()
            random_time2 = fake.time_object()
            job = Job(
                job_type=rc(job_list),
                description=fake.text(),
                pay_rate=round(random.uniform(15.5, 100.0), 1),
                address=fake.address(),
                city=fake.city(),
                state=fake.state(),
                employee_id=randint(1, 50),
                hire_id=randint(1, 10),
                date=random_date,
                start_time=random_time1,
                end_time=random_time2,
                status=rc(['active', 'accepted', 'completed', 'cancelled'])
            )
            jobs.append(job)
        db.session.add_all(jobs)

        print("Creating reviews...")
        reviews = []
        for _ in range(20):
            review = Review(
                content=fake.text(),
                rating=randint(1, 5),
                job_id=randint(1, 10),
                reviewer_id=randint(1, 50)
            )
            reviews.append(review)
        db.session.add_all(reviews)

        print("Creating blacklists ...")
        blacklists = []
        for _ in range(5):
            blacklist = Blacklist(
                email=fake.email(),
            )
            blacklists.append(blacklist)
        db.session.add_all(blacklists)

        print("Creating hires ...")
        hires = []
        for _ in range(5):
            hire = Hire(
                job_id=randint(1, 10),
                job_seeker_id=randint(1, 50)
            )
            hires.append(hire)
        db.session.add_all(hires)

        print("Committing ...")
        db.session.commit()

        print("Done!")