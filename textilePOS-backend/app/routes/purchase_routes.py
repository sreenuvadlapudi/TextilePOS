from flask import Blueprint, jsonify
from ..controllers.purchase_controller import get_purchases

purchase_bp = Blueprint('purchases', __name__)

@purchase_bp.route('/purchases', methods=['GET'])
def purchases():
    return jsonify(get_purchases())
