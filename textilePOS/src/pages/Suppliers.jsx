import { useEffect, useState } from 'react'
import { fetchSuppliers } from '../services/api.js'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', phone: '', city: '' })

  useEffect(() => {
    fetchSuppliers().then((data) => {
      setSuppliers(data)
      setLoading(false)
    })
  }, [])

  function handleAddSupplier(event) {
    event.preventDefault()
    if (!newSupplier.name || !newSupplier.contact) {
      return
    }

    setSuppliers((current) => [
      ...current,
      {
        id: `S-${Math.floor(Math.random() * 10000)}`,
        name: newSupplier.name,
        contact: newSupplier.contact,
        phone: newSupplier.phone || '—',
        city: newSupplier.city || '—',
        productCount: 0,
      },
    ])

    setNewSupplier({ name: '', contact: '', phone: '', city: '' })
    setShowForm(false)
  }

  return (
    <section className="page page-suppliers">
      <div className="page-heading">
        <div>
          <h2>Suppliers</h2>
          <p>Vendor management and purchase order sources.</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setShowForm((current) => !current)}>
          {showForm ? 'Cancel' : 'Add supplier'}
        </button>
      </div>

      {showForm && (
        <div className="panel supplier-form">
          <h3>Add supplier</h3>
          <form onSubmit={handleAddSupplier} className="supplier-grid">
            <label>
              Name
              <input
                value={newSupplier.name}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </label>
            <label>
              Contact
              <input
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, contact: e.target.value }))}
                required
              />
            </label>
            <label>
              Phone
              <input
                value={newSupplier.phone}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </label>
            <label>
              City
              <input
                value={newSupplier.city}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, city: e.target.value }))}
              />
            </label>
            <div className="supplier-form-actions">
              <button className="primary-button" type="submit">
                Save supplier
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="page-loading">Loading suppliers...</div>
      ) : (
        <>
          <div className="supplier-summary">
            <div>
              <strong>{suppliers.length}</strong>
              <p>Suppliers connected</p>
            </div>
            <div>
              <strong>{suppliers.reduce((sum, supplier) => sum + (supplier.productCount || 0), 0)}</strong>
              <p>Products supplied</p>
            </div>
          </div>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.contact}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.city}</td>
                    <td>{supplier.productCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}
