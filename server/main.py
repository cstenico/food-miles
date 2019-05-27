# Backend
from flask import Blueprint, render_template
from flask_login import login_required, current_user

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return True # redirecionar para tela inicial


@main.route('/feed')
@login_required
def feed():
    return True # redirecionar para tela de feed