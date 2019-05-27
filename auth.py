from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db


auth = Blueprint('auth', __name__)


@auth.route('/login')
def login():
    return True # redirecionar para tela de login


@auth.route('/login', methods=['POST'])
def login_post():
    POST_EMAIL = str(request.form['email'])
    POST_PASSWORD = str(request.form['password'])

    user = User.query.filter_by(email=POST_EMAIL).first()
    if not user or not check_password_hash(user.password, POST_PASSWORD): 
        flash('Informações erradas. Tente novamente!')
        return redirect(url_for('auth.login')) # redirecionar para login novamente
    
    # usuário encontrado, redirecionar para tela principal
    login_user(user)
    return redirect(url_for('main.profile'))


@auth.route('/signup')
def signup():
    return True # redirecionar para tela de cadastro


@auth.route('/signup', methods=['POST'])
def signup_post():
    POST_NAME = str(request.form['name'])
    POST_CPF = str(request.form['cpf'])
    POST_EMAIL = str(request.form['email'])
    POST_PASSWORD = str(request.form['password'])

    user = User.query.filter_by(email=POST_EMAIL).first()
    if user:
        flash('Esse e-mail já está cadastrado!')
        return redirect(url_for('auth.signup')) # redirecionar para cadastro novamentee
    
    new_user = User(email=POST_EMAIL, name=POST_NAME, cpf=POST_CPF, password=generate_password_hash(POST_PASSWORD, method='sha256'))
    
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login')) # redirecionar para tela de login


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index')) # redirecionar para página principal
