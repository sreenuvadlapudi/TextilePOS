import { useEffect, useState } from 'react'
import { fetchCustomers } from '../services/api.js'
import { sendEmail } from '../services/email.js'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [sendingId, setSendingId] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCustomers().then((data) => {
      setCustomers(data)
      setLoading(false)
    })
  }, [])

  async function handleSendEmail(customer) {
    setMessage('')
    setSendingId(customer.id)

    try {
      await sendEmail({
        to: customer.email,
        subject: `Textile POS update for ${customer.name}`,
        text: `Hello ${customer.name},\n\nThis is a quick message from Textile POS. Please contact us if you need assistance.\n\nThanks,\nTextile POS Team`,
        html: `<p>Hello <strong>${customer.name}</strong>,</p><p>This is a quick message from Textile POS. Please contact us if you need assistance.</p><p>Thanks,<br/>Textile POS Team</p>`,
      })

      setMessage(`Email sent to ${customer.email}`)
    } catch (error) {
      setMessage(`Failed to send email to ${customer.email}`)
      console.error(error)
    } finally {
      setSendingId(null)
    }
  }

  return (
    <section className="page page-customers">
      <div className="page-heading">
        <div>
          <h2>Customers</h2>
          <p>Keep track of buyers, billing, and purchase history.</p>
        </div>
        <button className="primary-button">Add customer</button>
      </div>

      {message && <div className="page-loading">{message}</div>}

      {loading ? (
        <div className="page-loading">Loading customers...</div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.type}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.orders}</td>
                  <td>
                    <button
                      className="secondary-button"
                      type="button"
                      disabled={sendingId === customer.id}
                      onClick={() => handleSendEmail(customer)}
                    >
                      {sendingId === customer.id ? 'Sending…' : 'Send email'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
