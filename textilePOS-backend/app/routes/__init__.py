from flask import Blueprint
from .dashboard_routes import dashboard_bp
from .product_routes import product_bp
from .sales_routes import sales_bp
from .purchase_routes import purchase_bp
from .customer_routes import customer_bp
from .supplier_routes import supplier_bp
from .auth_routes import auth_bp
from .order_routes import order_bp

api_bp = Blueprint('api', __name__, url_prefix='/api')

api_bp.register_blueprint(dashboard_bp)
api_bp.register_blueprint(product_bp)
api_bp.register_blueprint(sales_bp)
api_bp.register_blueprint(purchase_bp)
api_bp.register_blueprint(customer_bp)
api_bp.register_blueprint(supplier_bp)
api_bp.register_blueprint(auth_bp)
api_bp.register_blueprint(order_bp)
