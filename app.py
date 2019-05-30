# -*- coding: utf-8 -*-

"""app.py: API for Food Miles application."""

import os
import pyrebase
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import json

app = Flask(__name__)


# get env variables
load_dotenv()
config = {
    "apiKey": os.environ.get("apiKey"),
    "authDomain": os.environ.get("authDomain"),
    "databaseURL": os.environ.get("databaseURL"),
    "projectId": os.environ.get("projectId"),
    "storageBucket": os.environ.get("storageBucket"),
    "messagingSenderId": os.environ.get("messagingSenderId")
}

# initialize connection to firebase
firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
db = firebase.database()


@app.route('/')
def index():
    return "Food Miles"


@app.route('/signup', methods=['GET'])
def signup_get():
    return "Signup route (Use POST on me)"


@app.route('/signup', methods=['POST'])
def signup_post():
    POST_EMAIL = str(request.form.get('email'))
    POST_NAME = str(request.form.get('name'))
    POST_PASSWORD = str(request.form.get('password'))
    POST_CPF = str(request.form.get('cpf'))

    new_user = auth.create_user_with_email_and_password(POST_EMAIL, POST_PASSWORD)
    return json.dumps(new_user)


@app.route('/login', methods=['GET'])
def login_get():
    return "Login route (Use POST on me)"


@app.route('/login', methods=['POST'])
def login_post():
    POST_EMAIL = str(request.form.get('email'))
    POST_PASSWORD = str(request.form.get('password'))

    print(POST_EMAIL, POST_PASSWORD)
    
    user = auth.sign_in_with_email_and_password(POST_EMAIL, POST_PASSWORD)
    return json.dumps(user)


if __name__ == '__main__':
    app.run(debug=True)