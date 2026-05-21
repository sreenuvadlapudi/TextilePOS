from flask import Blueprint, jsonify
from ..controllers.customer_controller import get_customers

customer_bp = Blueprint('customers', __name__)

@customer_bp.route('/customers', methods=['GET'])
def customers():
    return jsonify(get_customers())
