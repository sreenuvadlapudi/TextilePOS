import StatCard from '../components/ui/StatCard.jsx'
import { formatCurrency } from '../utils/format.js'
import { useEffect, useState } from 'react'
import { fetchDashboardOverview } from '../services/api.js'

export default function Dashboard() {
  const [overview, setOverview] = useState(null)

  useEffect(() => {
    fetchDashboardOverview().then(setOverview)
  }, [])

  if (!overview) {
    return <div className="page-loading">Loading overview...</div>
  }

  const lowStockItems = overview.lowStockItems || []
  const salesReport = overview.salesReport || {}

  return (
    <section className="page page-dashboard">
      <div className="page-heading">
        <div>
          <h2>Overview</h2>
          <p>Fast insights into textile inventory, supplier health, and sales performance.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(overview.revenue)}
          description="Current month revenue from all sales."
          delta={`${overview.revenueChange}% from last month`}
        />
        <StatCard
          title="Products in Stock"
          value={overview.productsInStock}
          description="Items ready for sale."
          delta={`${overview.stockChange}% inventory change`}
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockItems.length}
          description="Items that require reorder soon."
        />
        <StatCard
          title="Active Customers"
          value={overview.customers}
          description="Repeat buyers and business accounts."
        />
      </div>

      <div className="dashboard-panels">
        <div className="panel">
          <h3>Sales performance</h3>
          <ul className="list-card">
            <li>
              <span>Total revenue</span>
              <strong>{formatCurrency(salesReport.totalRevenue || overview.revenue)}</strong>
            </li>
            <li>
              <span>Average invoice</span>
              <strong>{formatCurrency(salesReport.averageSale || 0)}</strong>
            </li>
            <li>
              <span>Paid invoices</span>
              <strong>{salesReport.paid || '—'}</strong>
            </li>
          </ul>
        </div>

        <div className="panel">
          <h3>Low stock alerts</h3>
          {lowStockItems.length > 0 ? (
            <ul className="list-card">
              {lowStockItems.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <strong>{item.stock} left</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>All core inventory is within the healthy range.</p>
          )}
        </div>
      </div>

      <div className="dashboard-panels">
        <div className="panel">
          <h3>Top selling products</h3>
          <ul className="list-card">
            {overview.topProducts.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <strong>{item.units} units</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h3>Recent purchase invoices</h3>
          <ul className="list-card">
            {overview.recentPurchases.map((invoice) => (
              <li key={invoice.id}>
                <span>{invoice.vendor}</span>
                <strong>{formatCurrency(invoice.total)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
