from flask import Blueprint

register = Blueprint('register', __name__)

@register.route('/register', methods=['POST'])
def register_route():
  pass
