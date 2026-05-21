import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
app.use(express.json())

const {
  MONGO_URI = 'mongodb://localhost:27017',
  MONGO_DB = 'textilepos',
  EMAIL_LOGS_COLLECTION = 'email_logs',
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  PORT = 5001,
} = process.env

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  secure: Number(SMTP_PORT) === 465,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
})

const mongoClient = new MongoClient(MONGO_URI)
await mongoClient.connect()
const db = mongoClient.db(MONGO_DB)
const emailLogs = db.collection(EMAIL_LOGS_COLLECTION)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required email fields' })
  }

  const mailOptions = {
    from: SMTP_USER || 'no-reply@example.com',
    to,
    subject,
    text,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    await emailLogs.insertOne({
      to,
      subject,
      text,
      html,
      status: 'sent',
      messageId: info.messageId,
      sentAt: new Date(),
    })

    return res.json({ success: true, messageId: info.messageId })
  } catch (error) {
    await emailLogs.insertOne({
      to,
      subject,
      text,
      html,
      status: 'failed',
      error: error.message,
      attemptedAt: new Date(),
    })

    return res.status(500).json({ error: 'Failed to send email', details: error.message })
  }
})

app.get('/email-logs', async (_req, res) => {
  const logs = await emailLogs.find().sort({ attemptedAt: -1, sentAt: -1 }).limit(50).toArray()
  res.json(logs)
})

app.listen(PORT, () => {
  console.log(`Email service running on http://localhost:${PORT}`)
})
