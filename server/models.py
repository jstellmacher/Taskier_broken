from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db
# from werkzeug.security
# import generate_password_hash, check_password_hash
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    email = db.Column(db.String(255))
    created_at = db.Column(db.String(19))
    tasks = db.relationship('Task', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'tasks': [task.to_dict() for task in self.tasks]
        }

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        print(password_hash)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.id}>'


class Task(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(255))
    created_at = db.Column(db.String(19))
    # todos = db.relationship('Todo', backref='task', lazy=True, primaryjoin='Task.id == Todo.task_id')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at,
        }

# class Todo(db.Model, SerializerMixin):
#     __tablename__ = 'todos'
#     id = db.Column(db.Integer, primary_key=True)
#     description = db.Column(db.Text)
#     task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
#     created_at = db.Column(db.TIMESTAMP)


# !!--NOTE--!
# !The User model has a one-to-many relationship with the Task model, where a user can have multiple tasks. The tasks attribute in the User model represents this relationship. In this case, the lazy=True setting indicates that the related Task objects will be loaded lazily (on-demand) when accessed through the tasks attribute. It means that the associated tasks for a user will be loaded from the database only when you access the tasks attribute of a User object. 