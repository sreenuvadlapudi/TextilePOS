import { useEffect, useMemo, useState } from 'react'
import { fetchSales } from '../services/api.js'
import { formatCurrency } from '../utils/format.js'

export default function Sales() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSale, setSelectedSale] = useState(null)

  useEffect(() => {
    fetchSales().then((data) => {
      setSales(data)
      setLoading(false)
    })
  }, [])

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.total, 0),
    [sales],
  )

  const paidCount = useMemo(
    () => sales.filter((sale) => sale.status === 'Paid').length,
    [sales],
  )

  const pendingCount = useMemo(
    () => sales.filter((sale) => sale.status !== 'Paid').length,
    [sales],
  )

  const salesByStatus = useMemo(
    () =>
      sales.reduce((acc, sale) => {
        acc[sale.status] = (acc[sale.status] || 0) + 1
        return acc
      }, {}),
    [sales],
  )

  function handleGenerateInvoice(sale) {
    setSelectedSale(sale)
  }

  function handlePrintInvoice() {
    window.print()
  }

  return (
    <section className="page page-sales">
      <div className="page-heading">
        <div>
          <h2>Sales</h2>
          <p>Review recent sales, invoices, and revenue reports.</p>
        </div>
        <button className="primary-button">New sale</button>
      </div>

      <div className="sales-summary-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span>Total revenue</span>
            <strong>{formatCurrency(totalRevenue)}</strong>
          </div>
          <p>Revenue across all invoices.</p>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span>Paid invoices</span>
            <strong>{paidCount}</strong>
          </div>
          <p>Completed sales this period.</p>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span>Pending invoices</span>
            <strong>{pendingCount}</strong>
          </div>
          <p>Invoices waiting for payment.</p>
        </div>
      </div>

      {loading ? (
        <div className="page-loading">Loading sales...</div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.invoice}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.date}</td>
                  <td>{sale.status}</td>
                  <td>{formatCurrency(sale.total)}</td>
                  <td>
                    <button className="secondary-button" type="button" onClick={() => handleGenerateInvoice(sale)}>
                      Generate invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSale ? (
        <div className="panel invoice-preview">
          <div className="invoice-toolbar">
            <div>
              <h3>Invoice preview</h3>
              <p>{selectedSale.invoice} · {selectedSale.customer}</p>
            </div>
            <div className="invoice-actions">
              <button className="secondary-button" type="button" onClick={() => setSelectedSale(null)}>
                Close
              </button>
              <button className="primary-button" type="button" onClick={handlePrintInvoice}>
                Print invoice
              </button>
            </div>
          </div>
          <div className="invoice-metadata">
            <p><strong>Date:</strong> {selectedSale.date}</p>
            <p><strong>Status:</strong> {selectedSale.status}</p>
            <p><strong>Total:</strong> {formatCurrency(selectedSale.total)}</p>
          </div>
          <div className="invoice-lines">
            <p><strong>Bill to:</strong> {selectedSale.customer}</p>
            <ul>
              <li>Invoice amount: {formatCurrency(selectedSale.total)}</li>
              <li>Status: {selectedSale.status}</li>
              <li>Invoice ID: {selectedSale.invoice}</li>
            </ul>
          </div>
          <div className="sales-report-list">
            <h4>Sales breakdown</h4>
            <ul className="list-card">
              {Object.entries(salesByStatus).map(([status, count]) => (
                <li key={status}>
                  <span>{status}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  )
}
