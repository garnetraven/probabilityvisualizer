from flask import Flask
from flask_cors import CORS
from views import login, register, draw
from database import create_tables

app = Flask(__name__)
CORS(app)

app.register_blueprint(login)
app.register_blueprint(register)
app.register_blueprint(draw)

if __name__ == '__main__':
    create_tables() # Ensure database tables are created before running app
    app.run(debug=True, port=5001)
