import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../store/useAppContext.jsx'

export default function Topbar() {
  const [query, setQuery] = useState('')
  const { cart, user, logout } = useAppContext()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Textile Business Dashboard</h1>
        <p>Manage inventory, sales, purchases, and customer details in one place.</p>
      </div>

      <div className="topbar-right">
        <label className="search-box">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, invoices, customers..."
          />
        </label>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/cart" className="secondary-button" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Cart ({cart.length})
          </Link>
          {user ? (
            <>
              <div className="profile-card">
                <span>{user.name?.charAt(0) || 'U'}</span>
                <div>
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
              </div>
              <button type="button" className="secondary-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" className="secondary-button">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
