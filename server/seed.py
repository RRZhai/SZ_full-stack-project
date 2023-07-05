#!/usr/bin/env python3

# Standard library imports
from random import randint, random, choice as rc

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
        for _ in range(50):
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
        
        print("Creating jobs...")
        class JobProvider(BaseProvider):
            def random_from_joblist(self, job_list):
                return self.random_element(job_list)
        fake.add_provider(JobProvider)
        job_list = ['Babysitting', 'House Cleaning', 'Tutoring', 'Dog Walking', 'Delivery Service', 'Event Staffing', 'Handyman Service', 'Modeling']
        jobs = []
        for _ in range(30):
            job = Job(
                job_type=fake.fake.random_from_joblist(job_list),
                description=fake.text(),
                pay_rate=round(random.uniform(15.5, 100.0), 1),
                city=fake.city(),
                state=fake.state(),
                employee_id=randint(1, 50),
                job_seeker_id=randint(1, 50),
                start_time=fake.date_time(),
                end_time=fake.date_time(),
                status=rc(['pending', 'accepted', 'completed', 'cancelled'])
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
                user_id=randint(1, 50)
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

        print("Committing ...")
        db.session.commit()

        print("Done!")