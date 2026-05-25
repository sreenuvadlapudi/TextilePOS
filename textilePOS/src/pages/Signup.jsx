import { useState } from 'react'
import { signupCustomer } from '../services/api.js'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../store/useAppContext.jsx'
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Link as MuiLink,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
})

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 460,
            borderRadius: 2,
            animation: 'slideIn 0.4s ease-out',
            '@keyframes slideIn': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            Create account
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
            Join us and start managing your textile business
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              fullWidth
              type="text"
              label="Full name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              size="medium"
            />
            <TextField
              fullWidth
              type="email"
              label="Email address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              size="medium"
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              size="medium"
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 700,
                padding: '10px 14px',
                '&:hover': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.25)',
                },
              }}
            >
              {loading ? 'Creating…' : 'Create account'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: '1px solid #e5e7eb' }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Already have an account?{' '}
              <MuiLink
                component={Link}
                to="/login"
                sx={{ color: '#667eea', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}
