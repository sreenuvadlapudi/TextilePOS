from flask import Blueprint, jsonify
from ..controllers.dashboard_controller import get_dashboard_overview

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
def dashboard():
    return jsonify(get_dashboard_overview())
