from flask import Blueprint, jsonify
from ..controllers.sales_controller import get_sales

sales_bp = Blueprint('sales', __name__)

@sales_bp.route('/sales', methods=['GET'])
def sales():
    return jsonify(get_sales())
