def get_dashboard_overview():
    return {
        'revenue': 118920,
        'revenueChange': 7.2,
        'productsInStock': 1284,
        'stockChange': 3.8,
        'openOrders': 12,
        'customers': 84,
        'topProducts': [
            {'id': 'fabric-001', 'name': 'Silk Print', 'units': 520},
            {'id': 'fabric-002', 'name': 'Cotton Yard', 'units': 314},
            {'id': 'fabric-003', 'name': 'Denim Roll', 'units': 205},
        ],
        'recentPurchases': [
            {'id': 'P-940', 'vendor': 'Metro Fabrics', 'total': 18250},
            {'id': 'P-941', 'vendor': 'Global Textiles', 'total': 15210},
            {'id': 'P-942', 'vendor': 'Premium Yarns', 'total': 9600},
        ],
    }
