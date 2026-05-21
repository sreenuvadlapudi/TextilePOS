from datetime import datetime
from uuid import uuid4

_orders = []

def create_order(customer, items):
    order_id = f"O-{1000 + len(_orders) + 1}"
    order = {
        'id': order_id,
        'customer': customer,
        'items': items,
        'subtotal': sum(item['price'] * item['quantity'] for item in items),
        'tax': 0,
        'total': sum(item['price'] * item['quantity'] for item in items),
        'status': 'Pending',
        'createdAt': datetime.utcnow().isoformat() + 'Z',
    }
    _orders.append(order)
    return order

def get_orders():
    return list(_orders)
