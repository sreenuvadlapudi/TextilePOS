const EMAIL_API_BASE_URL = import.meta.env.VITE_EMAIL_API_URL || 'http://localhost:5001'

async function callEmailApi(path, body) {
  const response = await fetch(`${EMAIL_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `Email API error ${response.status}`)
  }

  return response.json()
}

export async function sendEmail({ to, subject, text, html }) {
  return callEmailApi('/send-email', { to, subject, text, html })
}
