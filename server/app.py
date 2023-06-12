from flask import Flask, jsonify, request, make_response, session
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import User, Task
CORS(app)

# ---------------------------------------------------------------------!

app.secret_key ='secret'

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
        if not data or 'title' not in data or 'description' not in data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        task_title = data['title']
        task_description = data['description']

        task = Task(title=task_title, description=task_description, user_id=id)
        db.session.add(task)
        db.session.commit()

        return make_response(jsonify({'message': 'Task added successfully'}), 201)



class Tasks(Resource):
    def get(self):
        tasks = Task.query.all()
        tasks_list = [task.to_dict() for task in tasks]
        return make_response(jsonify(tasks_list), 200)

    
class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('_password_hash')

        user._password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session['id'] = customer.id

            return user.to_dict(), 201

        except:
            return make_response(jsonify({'error': 'Failed to create user'}), 400)


@app.route('/check-session', methods=['GET'])
def CheckSession():
    if session.get('user_id'):
        # User is logged in
        response = make_response(jsonify({'message': 'User is logged in'}), 200)
        response.set_cookie('user_id', str(session['user_id']))
        return response
    else:
        # User is not logged in
        return make_response(jsonify({'message': 'User is not logged in'}), 401)


class Login(Resource):
    
    def post(self):

        user = User.query.filter_by(email=request.get_json()['username']).first()

        if user and user.authenticate(request.get_json()['password']):
            # if user.authenticate(password):

            # session['user_id'] = user.id
            
            response = make_response(user.to_dict(), 200)
            response.set_cookie('username', user.username)
        
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    with app.app_context():
        db.create_all()
        app.run(debug=True)
