from flask import Flask, jsonify, request, make_response, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from config import app, db
from models import User, Task
from datetime import datetime

migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return '<h1>TASKIER</h1>'


class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return jsonify(user_list)


class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return jsonify(user.to_dict())
        return {'error': 'User not found'}, 404

    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'User not found'}, 404

        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        for key, value in data.items():
            setattr(user, key, value)

        db.session.commit()

        return jsonify(user.to_dict())

    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'User not found'}, 404

        db.session.delete(user)
        db.session.commit()

        return make_response(jsonify({'message': 'User deleted successfully'}), 200)
    # def get(self, id):
    #     user = User.query.get(id)
    #     if user:
    #         return make_response(jsonify(user.to_dict()), 200)
    #     else:
    #         return make_response(jsonify({'error': 'User not found'}), 404)
        
class Account(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(jsonify(user.to_dict()), 200)
        else:
            return make_response(jsonify({'error': 'User not found'}), 404)


class Tasks(Resource):
    def get(self):
        tasks = Task.query.all()
        tasks_list = [task.to_dict() for task in tasks]
        return make_response(jsonify(tasks_list), 200)
    

class UserTasks(Resource):
    def post(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'User not found'}, 404

        data = request.get_json()
        if not data or 'title' not in data or 'description' not in data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        task_title = data['title']
        task_description = data['description']

        task = Task(title=task_title, description=task_description, user_id=id)
        db.session.add(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task added successfully'}), 201)


class TaskById(Resource):
    def get(self, id):
        task = Task.query.get(id)
        if task:
            return jsonify(task.to_dict())
        return {'error': 'Task not found'}, 404

    def patch(self, id):
        task = Task.query.get(id)
        if not task:
            return {'error': 'Task not found'}, 404

        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        for key, value in data.items():
            setattr(task, key, value)

        db.session.commit()

        return jsonify(task.to_dict())

    def delete(self, id):
        task = Task.query.get(id)
        if not task:
            return {'error': 'Task not found'}, 404

        db.session.delete(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task deleted successfully'}), 200)
    

from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        password = data.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(username=data.get('username'), password=hashed_password, email=data.get('email'))
        user.created_at = datetime.now()

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User created successfully'}), 201)



# @app.route('/check-session', methods=['GET'])
# def CheckSession():
#     if session.get('user_id'):
#         # User is logged in
#         response = make_response(jsonify({'message': 'User is logged in'}), 200)
#         response.set_cookie('user_id', str(session['user_id']))
#         return response
#     else:
#         # User is not logged in
#         return make_response(jsonify({'message': 'User is not logged in'}), 401)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return make_response(jsonify({'error': 'Invalid username or password'}), 401)

    session['user_id'] = user.id

    return make_response(jsonify({'message': 'Logged in successfully', 'user_id': user.id}), 200)


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from the session
    return make_response(jsonify({'message': 'Logged out successfully'}), 200)

# @app.route('/cookies', methods=['GET'])
# def cookies():
#     if request.method == 'GET':
#         email = request.cookies.get('user_email')
#         user = User.query.filter(User.email == email).first()
#         if user:
#             response = make_response(user.to_dict(), 200)
#     return response


api.add_resource(Signup, '/signup')
api.add_resource(Users, '/users')
api.add_resource(Tasks, '/tasks')
api.add_resource(TaskById, '/tasks/<int:id>')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(UserTasks, '/users/<int:id>/tasks')
api.add_resource(Account, '/users/<int:id>/account')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    # with app.app_context():
    #     db.create_all()
    #     app.run(debug=True)
