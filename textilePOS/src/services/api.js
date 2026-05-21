const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function callApi(path) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`)
    if (!response.ok) {
      throw new Error(`API error ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.warn('API request failed, using fallback data:', error)
    return null
  }
}

const fallback = {
  dashboard: {
    revenue: 118920,
    revenueChange: 7.2,
    productsInStock: 1284,
    stockChange: 3.8,
    openOrders: 12,
    customers: 84,
    topProducts: [
      { id: 'fabric-001', name: 'Silk Print', units: 520 },
      { id: 'fabric-002', name: 'Cotton Yard', units: 314 },
      { id: 'fabric-003', name: 'Denim Roll', units: 205 },
    ],
    recentPurchases: [
      { id: 'P-940', vendor: 'Metro Fabrics', total: 18250 },
      { id: 'P-941', vendor: 'Global Textiles', total: 15210 },
      { id: 'P-942', vendor: 'Premium Yarns', total: 9600 },
    ],
    lowStockItems: [
      { id: 'TX-1002', name: 'Denim Roll', stock: 96 },
      { id: 'TX-1003', name: 'Linen Sheet', stock: 210 },
      { id: 'TX-1005', name: 'Silk Print', stock: 88 },
    ],
    salesReport: {
      totalRevenue: 118920,
      averageSale: 1780,
      paid: 24,
    },
  },
  products: [
    {
      sku: 'TX-1000',
      name: 'Silk Print',
      category: 'silk',
      image: '/products/tx-1000.svg',
      fabric: 'Silk',
      color: 'Lavender',
      material: 'Silk Blend',
      gsm: 120,
      stock: 142,
      price: 18.5,
    },
    {
      sku: 'TX-1001',
      name: 'Cotton Yard',
      category: 'cotton',
      image: '/products/tx-1001.svg',
      fabric: 'Cotton',
      color: 'Ivory',
      material: '100% Cotton',
      gsm: 160,
      stock: 550,
      price: 8.75,
    },
    {
      sku: 'TX-1002',
      name: 'Denim Roll',
      category: 'shirts',
      image: '/products/tx-1002.svg',
      fabric: 'Denim',
      color: 'Indigo',
      material: 'Heavy Cotton',
      gsm: 340,
      stock: 96,
      price: 27.25,
    },
    {
      sku: 'TX-1003',
      name: 'Linen Sheet',
      category: 'saree',
      image: '/products/tx-1003.svg',
      fabric: 'Linen',
      color: 'Sand',
      material: 'Linen',
      gsm: 200,
      stock: 210,
      price: 12.0,
    },
    {
      sku: 'TX-1004',
      name: 'Polyester Weave',
      category: 'polyester',
      image: '/products/tx-1004.svg',
      fabric: 'Polyester',
      color: 'Pearl',
      material: 'Polyester',
      gsm: 150,
      stock: 320,
      price: 9.5,
    },
  ],
  sales: [
    { id: 'S-1001', invoice: 'INV-8743', customer: 'Riya Traders', date: '2026-05-18', status: 'Paid', total: 2250 },
    { id: 'S-1002', invoice: 'INV-8744', customer: 'Lotus Retail', date: '2026-05-19', status: 'Pending', total: 1120 },
    { id: 'S-1003', invoice: 'INV-8745', customer: 'Urban Tailors', date: '2026-05-20', status: 'Paid', total: 3780 },
  ],
  purchases: [
    { id: 'P-1022', po: 'PO-2882', vendor: 'Metro Fabrics', date: '2026-05-10', status: 'Delivered', total: 14500 },
    { id: 'P-1023', po: 'PO-2883', vendor: 'Premium Yarns', date: '2026-05-14', status: 'In transit', total: 8100 },
    { id: 'P-1024', po: 'PO-2884', vendor: 'Global Textiles', date: '2026-05-17', status: 'Delivered', total: 13420 },
  ],
  customers: [
    { id: 'C-1001', name: 'Riya Traders', type: 'Retail', phone: '+91 98765 43210', email: 'riya@traders.com', orders: 18 },
    { id: 'C-1002', name: 'Lotus Retail', type: 'Wholesale', phone: '+91 91234 56789', email: 'sales@lotusretail.com', orders: 24 },
    { id: 'C-1003', name: 'Urban Tailors', type: 'Business', phone: '+91 90123 45678', email: 'hello@urbantailors.com', orders: 12 },
  ],
  suppliers: [
    { id: 'S-1001', name: 'Metro Fabrics', contact: 'Arun Mehta', phone: '+91 99887 66554', city: 'Mumbai', productCount: 54 },
    { id: 'S-1002', name: 'Global Textiles', contact: 'Sneha Patel', phone: '+91 98765 44321', city: 'Ahmedabad', productCount: 48 },
    { id: 'S-1003', name: 'Premium Yarns', contact: 'Karan Shah', phone: '+91 95678 12345', city: 'Surat', productCount: 37 },
  ],
}

export async function fetchDashboardOverview() {
  const data = await callApi('/dashboard')
  return data || fallback.dashboard
}

export async function fetchProducts() {
  const data = await callApi('/products')
  return data || fallback.products
}

export async function fetchSales() {
  const data = await callApi('/sales')
  return data || fallback.sales
}

export async function fetchPurchases() {
  const data = await callApi('/purchases')
  return data || fallback.purchases
}

export async function fetchCustomers() {
  const data = await callApi('/customers')
  return data || fallback.customers
}

export async function fetchSuppliers() {
  const data = await callApi('/suppliers')
  return data || fallback.suppliers
}

export async function createOrder(order) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Order API error ${response.status}`)
  }
  return response.json()
}

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`)
  if (!response.ok) {
    throw new Error(`Order API error ${response.status}`)
  }
  return response.json()
}

export async function signupCustomer({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return await response.json()
}

export async function loginCustomer({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return await response.json()
}
