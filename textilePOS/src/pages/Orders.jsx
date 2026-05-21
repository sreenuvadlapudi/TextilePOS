import { useEffect, useState } from 'react'
import { fetchOrders } from '../services/api.js'
import { formatCurrency } from '../utils/format.js'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <section className="page page-orders">
      <div className="page-heading">
        <div>
          <h2>Orders</h2>
          <p>View your placed orders and order status.</p>
        </div>
      </div>

      {loading ? (
        <div className="page-loading">Loading orders...</div>
      ) : error ? (
        <div className="page-loading">{error}</div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>{order.customer?.name || order.customer?.email}</td>
                  <td>{order.items?.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td>{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
