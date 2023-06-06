from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!

# class User(db.Model, SerializerMixin):
#     id = db.Column(db.)
#     username = db.Column(db.String(64), index=True, unique=True)
#     email = db.Column(db.String(120), index=True, unique=True)
#     password_hash = db.Column(db.String(128))
    
class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(64), index=True, unique=True)
    # email = db.Column(db.String(120), index=True, unique=True)
    # password_hash = db.Column(db.String(128))
    # role = db.Column(db.String())
    # created_at = db.Column(db.DateTime, index=True, default=datetime.)

class task_assignments(db.Model, SerializerMixin):
    task_id = db.Column(db.Integer, primary_key=True)
    # assigned_user_id = db.Column(db.Integer, db.ForeignKey('user.id)

    created_at = db.Column(db.DateTime, index=True, default=datetime.now)

class tasks(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    description = db.Column(db.String(120))
    user_id = db.Column(db.)
    status = db.Column(db.String())
    created_at = db.Column(db.DateTime, index=True, default=datetime.now)
