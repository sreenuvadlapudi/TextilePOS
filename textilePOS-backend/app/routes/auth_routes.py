from flask import Blueprint, request, jsonify
from ..controllers.auth_controller import signup_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/signup', methods=['POST'])
def signup():
    body = request.get_json() or {}
    name = body.get('name')
    email = body.get('email')
    password = body.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'name, email and password are required'}), 400

    resp, status = signup_user(name, email, password)
    return jsonify(resp), status

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    body = request.get_json() or {}
    email = body.get('email')
    password = body.get('password')

    if not email or not password:
        return jsonify({'error': 'email and password are required'}), 400

    resp, status = login_user(email, password)
    return jsonify(resp), status
