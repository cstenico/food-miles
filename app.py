# -*- coding: utf-8 -*-

"""app.py: Simple API for Food Miles' connection to Firebase"""

import os
import sys
import pyrebase
import requests
from flask import Flask, jsonify, request, render_template
from dotenv import load_dotenv
import json
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
handler = logging.StreamHandler(sys.stdout)
logger.addHandler(handler)

# get env variables
logger.info('Loading env variables...')
load_dotenv()
config = {
    "apiKey": os.environ.get("apiKey"),
    "authDomain": os.environ.get("authDomain"),
    "databaseURL": os.environ.get("databaseURL"),
    "projectId": os.environ.get("projectId"),
    "storageBucket": os.environ.get("storageBucket"),
    "messagingSenderId": os.environ.get("messagingSenderId")
}

# initialize API
logger.info('Initializing API...')
app = Flask(__name__,
            static_url_path='', 
            static_folder='docs',
            template_folder='docs')

# initialize connection to firebase
logger.info('Initializing database connection')
firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()


# home
@app.route('/')
def index():

    """Backend manual"""

    return render_template('routes.html')


# auth routes
@app.route('/signup', methods=['POST'])
def signup_post():

    """SIGNUP route. Tries to auth and insert new user into database, returns Firebase JSON response"""

    POST_EMAIL = str(request.form.get('email'))
    POST_NAME = str(request.form.get('name'))
    POST_PASSWORD = str(request.form.get('password'))
    POST_CPF = ''.join(list(filter(lambda x: x.isdigit(), str(request.form.get('cpf')))))
    POST_TELEPHONE = ''.join(list(filter(lambda x: x.isdigit(), str(request.form.get('telephone')))))
    POST_ADDRESS = str(request.form.get('address'))

    logger.info('Got SIGNUP request with params: ' + POST_EMAIL +  "," + POST_PASSWORD + "," + POST_NAME + "," + POST_CPF + "," + POST_TELEPHONE + "," + POST_ADDRESS)

    new_user_data = {
        "name": POST_NAME,
        "email": POST_EMAIL,
        "cpf": POST_CPF,
        "telephone": POST_TELEPHONE,
        "address": POST_ADDRESS
    }

    # create new user (auth)
    try:
        new_user = auth.create_user_with_email_and_password(POST_EMAIL, POST_PASSWORD)
        logger.info('Sucessfully created new user.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot signup.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)
    # create new user (db)
    try:
        db.child("users").child(POST_EMAIL).set(new_user_data)
        logger.info('Sucessfully inserted new user into database.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot insert new user into database.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)

    return json.dumps(new_user)


@app.route('/login', methods=['POST'])
def login_post():

    """LOGIN route. Tries to auth user, returns Firebase JSON response."""

    POST_EMAIL = str(request.form.get('email'))
    POST_PASSWORD = str(request.form.get('password'))

    logger.info('Got LOGIN request with params: ' + POST_EMAIL +  "," + POST_PASSWORD)

    try:
        response = auth.sign_in_with_email_and_password(POST_EMAIL, POST_PASSWORD)
        logger.info('Sucessfully logged in.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot login.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)

    response['code'] = "200"
    return json.dumps(response)


# database routes
@app.route('/products', methods=['GET'])
def products_get():

    """PRODUCTS (GET) route. Tries to get all products from a user, returns Firebase JSON response."""

    POST_USER_TOKEN = str(request.form.get('user_token'))
    POST_SELLER = str(request.form.get('seller_email'))

    logger.info('Got PRODUCTS GET request with params: ' + POST_USER_TOKEN +  "," + POST_SELLER)
    try:
        response = db.child("products").child(POST_SELLER).get(POST_USER_TOKEN).val()
        logger.info('Sucessfully got products list.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot get products list.')
        error_json = e.args[1]
        error = json.loads(error_json)
        return json.dumps(error)

    response['code'] = "200"
    return json.dumps(response)


@app.route('/products', methods=['POST'])
def products_post():

    """PRODUCTS (POST) route. Tries to insert new product for a user, returns Firebase JSON response."""

    POST_USER_TOKEN = str(request.form.get('user_token'))
    POST_USER_TOKEN_EMAIL = str(request.form.get('seller_email'))

    POST_PRODUCT_NAME = str(request.form.get('product_name'))
    POST_PRODUCT_PRICE = str(request.form.get('product_price'))
    POST_PRODUCT_DESCRIPTION = str(request.form.get('product_description'))
    POST_PRODUCT_CATEGORY = str(request.form.get('product_category'))

    logger.info('Got PRODUCT POST request with params: ' + POST_USER_TOKEN + "," + POST_USER_TOKEN_EMAIL +  "," + POST_PRODUCT_NAME + "," + POST_PRODUCT_PRICE + "," + POST_PRODUCT_DESCRIPTION + "," + POST_PRODUCT_CATEGORY)

    new_product = {
        "category": POST_PRODUCT_CATEGORY,
        "name": POST_PRODUCT_NAME,
        "description": POST_PRODUCT_DESCRIPTION,
        "price": POST_PRODUCT_PRICE
    }

    try:
        # insert product into 'products'
        response = db.child("products").child(POST_USER_TOKEN_EMAIL).child(POST_PRODUCT_NAME).set(new_product, POST_USER_TOKEN)
        logger.info('Sucessfully inserted product.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot insert product.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)

    try:
        # insert product into respective category
        response = db.child("categories").child(POST_PRODUCT_CATEGORY).child(POST_PRODUCT_NAME).set(new_product, POST_USER_TOKEN)
        logger.info('Sucessfully inserted product into category.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot insert product into category.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)

    response['code'] = "200"
    return json.dumps(response)


@app.route('/categories', methods=['GET'])
def category_get():

    """CATEGORIES (GET) route. Tries to get all products from a category, returns Firebase JSON response."""

    POST_USER_TOKEN = str(request.form.get('user_token'))
    POST_CATEGORY = str(request.form.get('category'))

    logger.info('Got CATEGORY GET request with params: ' + POST_USER_TOKEN +  "," + POST_CATEGORY)
    try:
        response = db.child("categories").child(POST_CATEGORY).get(POST_USER_TOKEN).val()
        logger.info('Sucessfully got products list.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot get products list.')
        error_json = e.args[1]
        error = json.loads(error_json)
        return json.dumps(error)

    response['code'] = "200"
    return json.dumps(response)


# storage routes
@app.route('/products/image', methods=['POST'])
def products_image_post():

    """PRODUCTS UPLOAD (POST) route. Tries to upload image for a product, returns Firebase JSON response."""

    POST_USER_TOKEN = str(request.form.get('user_token'))
    POST_USER = str(request.form.get('seller_email'))
    POST_PRODUCT = str(request.form.get('product_name'))
    POST_IMAGE = request.files.get('product_image', '') # TODO

    logger.info('Got PRODUCT IMAGE UPLOAD request with params: ' + POST_USER_TOKEN + "," + POST_PRODUCT +  "," + str(POST_IMAGE))
    
    try:
        response = storage.child("products").child(POST_USER).child(POST_PRODUCT).put(POST_IMAGE, POST_USER_TOKEN)
        logger.info('Sucessfully uploaded product image.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot upload product image.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)

    response['code'] = "200"
    return json.dumps(response)


@app.route('/products/image', methods=['GET'])
def products_image_get():

    """PRODUCTS IMAGE (GET) route. Tries to get image for a product, returns Firebase JSON response."""

    POST_USER_TOKEN = str(request.form.get('user_token'))
    POST_USER = str(request.form.get('seller'))
    POST_PRODUCT = str(request.form.get('product_name'))

    try:
        response = storage.child("products").child(POST_USER).child(POST_PRODUCT).get_url(POST_USER_TOKEN)
        logger.info('Sucessfully got product image.')
    except requests.exceptions.HTTPError as e:
        logger.error('Cannot get product image.')
        error_json = e.args[1]
        error = json.loads(error_json)['error']
        return json.dumps(error)

    response['code'] = "200"
    return json.dumps(response)


# contact route
@app.route('/contact', methods=['GET'])
def contact():

    """CONTACT route. Generates and returns Whatsapp Click to Chat link."""

    POST_TELEPHONE = str(request.form.get('telephone'))
    POST_PRODUCT_NAME = str(request.form.get('product_name'))
    POST_SELLER_NAME = str(request.form.get('seller_name'))

    logger.info('Got CONTACT request with params: ' + POST_TELEPHONE + "," + POST_PRODUCT_NAME +  "," + POST_SELLER_NAME)

    text = 'Olá ' + POST_SELLER_NAME + '! Te vi no Food Miles e estou interessado no produto ' + POST_PRODUCT_NAME
    return "https://wa.me/" + POST_TELEPHONE + "?text=" + text


if __name__ == '__main__':
    app.run(debug=True)