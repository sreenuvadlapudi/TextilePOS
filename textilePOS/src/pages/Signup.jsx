import { useState } from 'react'
import { signupCustomer } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../store/useAppContext.jsx'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAppContext()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await signupCustomer({ name, email, password })
      if (res.error) {
        setError(res.error)
      } else if (res.token) {
        login(res.user, res.token)
        navigate('/')
      } else {
        setError('Unexpected response')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page page-signup">
      <div className="page-heading">
        <div>
          <h2>Sign up</h2>
          <p>Create a new customer account.</p>
        </div>
      </div>

      <div className="table-card" style={{ maxWidth: 540 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 12 }}>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? 'Creating…' : 'Create account'}
              </button>
            </div>
            {error && <div style={{ color: 'var(--danger)' }}>{error}</div>}
          </div>
        </form>
      </div>
    </section>
  )
}
