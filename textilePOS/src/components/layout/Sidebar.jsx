import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Business', path: '/business' },
  { label: 'Products', path: '/products' },
  { label: 'Cart', path: '/cart' },
  { label: 'Orders', path: '/orders' },
  { label: 'Sales', path: '/sales' },
  { label: 'Purchases', path: '/purchases' },
  { label: 'Customers', path: '/customers' },
  { label: 'Suppliers', path: '/suppliers' },
]

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="brand">
        <span className="brand-mark">T</span>
        <div>
          <p>Textile</p>
          <small>Business POS</small>
        </div>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <p>Built for fast textile sales and inventory.</p>
      </div>
    </nav>
  )
}
