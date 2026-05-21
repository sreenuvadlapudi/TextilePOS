from flask import Flask, jsonify
from flask_cors import CORS
from app.routes import api_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(api_bp)

@app.route('/')
def home():
    return jsonify({'message': 'Textile POS API Running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
