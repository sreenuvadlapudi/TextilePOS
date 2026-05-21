from flask import Blueprint, request, jsonify
from ..controllers.order_controller import create_order, get_orders

order_bp = Blueprint('orders', __name__)

@order_bp.route('/orders', methods=['GET'])
def list_orders():
    return jsonify(get_orders())

@order_bp.route('/orders', methods=['POST'])
def create_new_order():
    payload = request.get_json() or {}
    customer = payload.get('customer')
    items = payload.get('items')

    if not customer or not items:
        return jsonify({'error': 'customer and items are required'}), 400

    order = create_order(customer, items)
    return jsonify(order), 201
