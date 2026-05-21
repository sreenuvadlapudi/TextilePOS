from flask import Blueprint, jsonify
from ..controllers.supplier_controller import get_suppliers

supplier_bp = Blueprint('suppliers', __name__)

@supplier_bp.route('/suppliers', methods=['GET'])
def suppliers():
    return jsonify(get_suppliers())
