#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Task, Todo

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        
        def seed_data():
            fake = Faker()

            print("Deleting data...")
            db.session.query(Task).delete()
            db.session.query(Todo).delete()
            db.session.query(User).delete()

            print("Creating users...")
            users = []
            for _ in range(5):
                email = fake.email()
                password = fake.password()
                username = fake.user_name()
                created_at = fake.date_time_this_decade()

                user = User(email=email, password=password, username=username, created_at=created_at)

                users.append(user)

                db.session.add(user)

            db.session.commit()

            print("Creating tasks...")
            tasks = []
            for user in users:
                for _ in range(2):
                    task = Task(
                        title=fake.sentence(nb_words=3),
                        description=fake.paragraph(),
                        user_id=user.id,
                        status=fake.random_element(elements=("todo", "in progress", "done")),
                        created_at=fake.date_time_this_decade()
                    )
                    tasks.append(task)
                    db.session.add(task)
            db.session.commit()

            print("Creating todos...")
            for task in tasks:
                for _ in range(3):
                    todo = Todo(
                        description=fake.sentence(nb_words=6),
                        task_id=task.id,
                        created_at=fake.date_time_this_decade()
                    )
                    db.session.add(todo)
            db.session.commit()

            print("Seeding done!")


        seed_data()