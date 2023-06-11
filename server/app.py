from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

# Local imports
from config import app, db, api
from models import User, Task

# ---------------------------------------------------------------------!

@app.route('/')
def index():
    return '<h1>TASKIER</h1>'


class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(jsonify(users_list), 200)


class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(jsonify(user.to_dict()), 200)
        else:
            return make_response(jsonify({'error': 'User not found'}), 404)


class UserTasks(Resource):
    def post(self, id):
        user = User.query.get(id)
        if not user:
            return {'error': 'User not found'}, 404

        data = request.get_json()
        if not data or 'task' not in data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        task_description = data['task']
        task = Task(description=task_description, user_id=user.id)
        db.session.add(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task added successfully'}), 201)


class Tasks(Resource):
    def get(self):
        tasks = Task.query.all()
        tasks_list = [task.to_dict() for task in tasks]
        return make_response(jsonify(tasks_list), 200)

    def post(self):
        data = request.get_json()
        title = data.get('title')
        # Add logic to create a new task with the provided title

    
class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('_password_hash')

        user._password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session['user_id'] = customer.id

            return user.to_dict(), 201

        except IntegrityError:
            return {'error' : '422 Unprocessable Entity'}, 422 

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            customer = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401


class Login(Resource):
    
    def post(self):

        user = User.query.filter_by(email=request.get_json()['username']).first()

        if user and user.authenticate(request.get_json()['password']):
            # if user.authenticate(password):

            # session['user_id'] = user.id
            
            response = make_response(user.to_dict(), 200)
            response.set_cookie('user_name', user.first_name)
            response.set_cookie('user_username', user.username)
        
        # else:
        #     return make_response({"error": "Unauthorized"}, 400)

        else:
            response = make_response({'error' : '401 Unauthroized'} , 401)

        return response


class Logout(Resource):
    def delete(self):

        for cookie in request.cookies:
            response.set_cookie(cookie, '', expires=0)

        return make_response('Logged out')

@app.route('/cookies', methods=['GET'])
def cookies():
    if request.method == 'GET':
        email = request.cookies.get('user_email')
        user = User.query.filter(User.email == email).first()
        if user:
            response = make_response(user.to_dict(), 200)
    return response

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(UserTasks, '/users/<int:id>/tasks')
api.add_resource(CheckSession, '/check-session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    with app.app_context():
        db.create_all()
        app.run(debug=True)
