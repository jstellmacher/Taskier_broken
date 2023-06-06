from sqlalchemy_serializer import SerializerMixin
from config import db
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    __tablename__ = 'users'
    # username = db.Column(db.String(255))
    # role = db.Column(db.String(255))
    # password = db.Column(db.String(255))
    # email = db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP)
    tasks = db.relationship('Task', backref='user', lazy=True)

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP)
    todos = db.relationship('Todo', backref='task', lazy=True)

class Todo(db.Model, SerializerMixin):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    created_at = db.Column(db.TIMESTAMP)


# !!--NOTE--!
# !The User model has a one-to-many relationship with the Task model, where a user can have multiple tasks. The tasks attribute in the User model represents this relationship. In this case, the lazy=True setting indicates that the related Task objects will be loaded lazily (on-demand) when accessed through the tasks attribute. It means that the associated tasks for a user will be loaded from the database only when you access the tasks attribute of a User object. 