import { useState } from 'react'
import { loginCustomer } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../store/useAppContext.jsx'

export default function Login() {
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
      const res = await loginCustomer({ email, password })
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
    <section className="page page-login">
      <div className="page-heading">
        <div>
          <h2>Login</h2>
          <p>Access your customer account.</p>
        </div>
      </div>

      <div className="table-card" style={{ maxWidth: 540 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 12 }}>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
            {error && <div style={{ color: 'var(--danger)' }}>{error}</div>}
          </div>
        </form>
      </div>
    </section>
  )
}
