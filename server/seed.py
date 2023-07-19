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

if __name__ == "__main__":
    fake = Faker(locale="en_US")
    with app.app_context():
        print("Deleting all records ...")
        User.query.delete()
        Job.query.delete()
        Review.query.delete()
        Blacklist.query.delete()
        Hire.query.delete()

        print("Creating users ...")

        u1 = User(
            email="pearl@bikini.com",
            _password_hash=fake.password(),
            name="Pearl Krabs",
            bio="I am the greedy founder and owner of the Krusty Krab restaurant, where SpongeBob works as a fry cook and Squidward works as a cashier. I am obsessed with money and dislikes spending it, but will go to great lengths to make even the smallest amounts of money.",
        )

        u2 = User(
            email="spongebob@bikini.com",
            _password_hash=fake.password(),
            name="Spongebob",
            bio="I am good-natured, naive, and enthusiastic sea sponge.",
            profile_pic_url="https://www.j-14.com/wp-content/uploads/2019/07/spongebob-squarepants-characters-35.png?fit=500%2C500&quality=86&strip=all",
        )

        u3 = User(
            email="patrickstar@bikini.com",
            _password_hash=fake.password(),
            name="Patrick Star",
            bio="I am the ignorant but humorous best friend of SpongeBob SquarePants. I am portrayed as being an overweight pink starfish, who serves as the village idiot of the underwater city of Bikini Bottom. I get dumber throughout the series and has been shown to make many ludicrous mistakes.",
            profile_pic_url="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/640px-Patrick_Star.svg.png",
        )

        u4 = User(
            email="squidward@bikini.com",
            _password_hash=fake.password(),
            name="Squidward",
            bio="I am an octopus who lives in a moai between SpongeBob SquarePants and Patrick Star. I am an arrogant and ill-tempered octopus who lives in an Easter Island moai and dislikes his neighbors (especially SpongeBob) for their childlike behavior.",
            profile_pic_url="https://nationaltoday.com/wp-content/uploads/2021/12/Annoy-Squidward-Day-1200x834.jpg",
        )

        u5 = User(
            email="krabs@bikini.com",
            _password_hash=fake.password(),
            name="Mr. Krabs",
            bio="I am a red crab who owns and operates the Krusty Krab restaurant where SpongeBob works. I am obsessed with money and dislikes spending it, but will go to great lengths to make even the smallest amounts of money.",
            profile_pic_url="https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png",
        )

        u6 = User(
            email="sandy@bikini.com",
            _password_hash=fake.password(),
            name="Sandy Cheeks",
            bio="I am a squirrel from Texas and a close friend of SpongeBob and Patrick. I am a thrill seeker who enjoys extreme sports and karate. I live in an air-filled glass treedome to survive underwater.",
            profile_pic_url="https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Sandy_Cheeks.svg/1200px-Sandy_Cheeks.svg.png",
        )

        u7 = User(
            email="shiyao@bikini.com",
            _password_hash="BikiniBottom",
            name="Shiyao",
            bio="I......",
            profile_pic_url="https://www.coachhousevets.com/wp-content/uploads/2023/04/no-photo-icon-22.png",
        )

        users = [u1, u2, u3, u4, u5, u6, u7]

        db.session.add_all(users)

        print("Creating jobs...")

        job_list = [
            "Babysitting",
            "House Cleaning",
            "Tutoring",
            "Dog Walking",
            "Delivery Service",
            "Event Staffing",
            "Handyman Service",
            "Modeling",
        ]
        j1 = Job(
            job_type='Babysitting',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='1234th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=None,
            date=date(2023, 12, 25),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='active',
        )
        j2 = Job(
            job_type='Tutoring',
            description='Teach my 5 year old daughter how to read',
            pay_rate=30.0,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=None,
            date=date(2023, 8, 20),
            start_time=time(9, 00),
            end_time=time(11, 00),
            status='active',
        )
        j3 = Job(
            job_type='House Cleaning',
            description='Clean my house',
            pay_rate=12.5,
            address='124 Conch Street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 8, 1),
            start_time=time(10, 30),
            end_time=time(12, 30),
            status='active',
        )
        j4 = Job(
            job_type='House Cleaning',
            description='Clean my house',
            pay_rate=12.5,
            address='124 Conch Street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 8, 2),
            start_time=time(10, 30),
            end_time=time(12, 30),
            status='active',
        )
        j5 = Job(
            job_type='House Cleaning',
            description='Clean my house',
            pay_rate=12.5,
            address='124 Conch Street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 8, 3),
            start_time=time(10, 30),
            end_time=time(12, 30),
            status='active',
        )
        j6 = Job(
            job_type='Handyman Service',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='Krusty Krab restaurant',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=5,
            hire_id=1,
            date=date(2023, 7, 1),
            start_time=time(17, 30),
            end_time=time(20, 30),
            status='completed',
        )
        j7 = Job(
            job_type='Babysitting',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='1234th street',
            city='San Francisco',
            state='CA',
            employee_id=5,
            hire_id=2,
            date=date(2023, 6, 30),
            start_time=time(17, 00),
            end_time=time(19, 00),
            status='completed',
        )
        j8 = Job(
            job_type='Babysitting',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='Karate Island',
            city='San Francisco',
            state='CA',
            employee_id=4,
            hire_id=3,
            date=date(2023, 10, 2),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='pending',
        )
        j9 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=4,
            hire_id=4,
            date=date(2023, 10, 10),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='pending',
        )
        j10 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='1th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 10, 9),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='active',
        )
        j11 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='3th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=1,
            hire_id=5,
            date=date(2023, 10, 2),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='pending',
        )
        j12 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='4th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=3,
            hire_id=6,
            date=date(2023, 4, 2),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='completed',
        )
        j13 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=7,
            date=date(2023, 3, 2),
            start_time=time(12, 30),
            end_time=time(14, 30),
            status='completed',
        )
        jobs = [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12]

        db.session.add_all(jobs)

        print("Creating reviews...")
        r1 = Review(
            content = "Super easy to work with!",
            rating = 5,
            job_id = 6,
            reviewer_id = 7,
        )
        r2 = Review(
            content = "The job was done well, but the worker was late by 30 minutes",
            rating = 3,
            job_id = 6,
            reviewer_id = 5,
        )
        r3 = Review(
            content = "Such a great worker! Would hire again!",
            rating = 5,
            job_id = 7,
            reviewer_id = 5,
        )
        r4 = Review(
            content = "Such a great boss! Would work for again!",
            rating = 5,
            job_id = 7,
            reviewer_id = 7,
        )
        r5 = Review(
            content = "Horrible boss!!! I would never recommend working for them!",
            rating = 1,
            job_id = 12,
            reviewer_id = 2,
        )
        r6 = Review(
            content = "Worst worker ever!!!",
            rating = 1,
            job_id = 12,
            reviewer_id = 3,
        )
        r7 = Review(
            content = "The worker is definitely a professional! Completed the job in a timely manner! Highly recommend!",
            rating = 5,
            job_id = 13,
            reviewer_id = 7,
        )
        reviews = [r1, r2, r3, r4, r5, r6, r7]
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
        h1 = Hire(
            job_id=6,
            job_seeker_id=7,
        )
        h2 = Hire(
            job_id=7,
            job_seeker_id=7,
        )
        h3 = Hire(
            job_id=8,
            job_seeker_id=7,
        )
        h4 = Hire(
            job_id=9,
            job_seeker_id=5,
        )
        h5 = Hire(
            job_id=11,
            job_seeker_id=3,
        )
        h6 = Hire(
            job_id=12,
            job_seeker_id=2,
        )
        h7 = Hire(
            job_id=13,
            job_seeker_id=2,
        )
        hires = [h1, h2, h3, h4, h5, h6, h7]
        db.session.add_all(hires)

        print("Committing ...")
        db.session.commit()

        print("Done!")
