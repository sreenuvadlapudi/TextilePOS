import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../store/useAppContext.jsx'
import { createOrder } from '../services/api.js'
import { formatCurrency } from '../utils/format.js'

export default function Cart() {
  const { cart, updateCartItem, removeFromCart, clearCart, user } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  async function handleCheckout() {
    if (!user) {
      setMessage('Please login or sign up before checking out.')
      return
    }
    setLoading(true)
    setMessage('')

    try {
      const items = cart.map((item) => ({
        sku: item.sku,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
      await createOrder({ customer: user, items })
      clearCart()
      navigate('/orders')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page page-cart">
      <div className="page-heading">
        <div>
          <h2>Shopping Cart</h2>
          <p>Review your selected products before placing your order.</p>
        </div>
      </div>

      {message && <div className="page-loading">{message}</div>}

      {cart.length === 0 ? (
        <div className="table-card">
          <p>Your cart is empty.</p>
          <Link to="/products" className="primary-button" style={{ textDecoration: 'none' }}>
            Browse products
          </Link>
        </div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.sku}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateCartItem(item.sku, Number(e.target.value) || 1)}
                      style={{ width: 60, padding: '0.45rem', borderRadius: 8, border: '1px solid var(--border)' }}
                    />
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                  <td>
                    <button type="button" className="secondary-button" onClick={() => removeFromCart(item.sku)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <div>
              <strong>Subtotal:</strong> {formatCurrency(subtotal)}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" className="secondary-button" onClick={clearCart}>
                Clear cart
              </button>
              <button type="button" className="primary-button" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Placing order…' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
