from werkzeug.security import generate_password_hash, check_password_hash
from uuid import uuid4

# Simple in-memory user store and token store for demo purposes
_users = []
_tokens = {}

def _find_user_by_email(email):
    for u in _users:
        if u['email'].lower() == email.lower():
            return u
    return None

def signup_user(name, email, password):
    if _find_user_by_email(email):
        return {'error': 'Email already registered'}, 400

    user = {
        'id': f"C-{1000 + len(_users) + 1}",
        'name': name,
        'email': email,
        'role': 'customer',
        'password_hash': generate_password_hash(password),
    }
    _users.append(user)
    token = str(uuid4())
    _tokens[token] = user['id']

    resp = { 'user': { 'id': user['id'], 'name': user['name'], 'email': user['email'] }, 'token': token }
    return resp, 201

def login_user(email, password):
    user = _find_user_by_email(email)
    if not user:
        return {'error': 'Invalid credentials'}, 401

    if not check_password_hash(user['password_hash'], password):
        return {'error': 'Invalid credentials'}, 401

    token = str(uuid4())
    _tokens[token] = user['id']
    resp = { 'user': { 'id': user['id'], 'name': user['name'], 'email': user['email'] }, 'token': token }
    return resp, 200

def get_user_by_token(token):
    uid = _tokens.get(token)
    if not uid:
        return None
    for u in _users:
        if u['id'] == uid:
            return { 'id': u['id'], 'name': u['name'], 'email': u['email'] }
    return None
