from flask import Blueprint, jsonify
from ..controllers.product_controller import get_products

product_bp = Blueprint('products', __name__)

@product_bp.route('/products', methods=['GET'])
def products():
    return jsonify(get_products())
