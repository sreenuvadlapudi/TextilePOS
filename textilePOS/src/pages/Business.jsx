import { Link } from 'react-router-dom'

const modules = [
  { label: 'Products', path: '/products', description: 'Manage fabric, colors, materials, inventory, and pricing.' },
  { label: 'Sales', path: '/sales', description: 'View completed sales, invoices, and performance reports.' },
  { label: 'Purchases', path: '/purchases', description: 'Track incoming stock and purchase orders.' },
  { label: 'Customers', path: '/customers', description: 'Manage customer profiles and business accounts.' },
  { label: 'Suppliers', path: '/suppliers', description: 'Manage supplier contacts and inventory sources.' },
  { label: 'Orders', path: '/orders', description: 'Review customer orders and order history.' },
]

export default function Business() {
  return (
    <section className="page page-business">
      <div className="page-header">
        <h2>Business Modules</h2>
        <p>Quick access to the core business workflows in the textile POS system.</p>
      </div>

      <div className="module-grid">
        {modules.map((module) => (
          <Link key={module.path} to={module.path} className="module-card">
            <h3>{module.label}</h3>
            <p>{module.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
