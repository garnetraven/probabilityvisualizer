from flask import Blueprint

login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def login_route():
  pass