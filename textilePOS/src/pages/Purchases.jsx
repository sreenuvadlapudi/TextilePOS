import { useEffect, useState } from 'react'
import { fetchPurchases } from '../services/api.js'
import { formatCurrency } from '../utils/format.js'

export default function Purchases() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPurchases().then((data) => {
      setPurchases(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className="page page-purchases">
      <div className="page-heading">
        <div>
          <h2>Purchases</h2>
          <p>Track supplies, vendor orders, and purchase totals.</p>
        </div>
        <button className="primary-button">Add purchase</button>
      </div>

      {loading ? (
        <div className="page-loading">Loading purchases...</div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>PO #</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.po}</td>
                  <td>{purchase.vendor}</td>
                  <td>{purchase.date}</td>
                  <td>{purchase.status}</td>
                  <td>{formatCurrency(purchase.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
