import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from './routes/userRoute.js'
import clientRoute from './routes/clientRoute.js'
import partnerRoute from './routes/partnerRoute.js'
import './config/db.js' // DB connection

const app = express()
const port = process.env.PORT || 5000  // ✅ Default must be 8080 for Cloud Run

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
  res.send("API is live on Cloud Run!")
})

app.use('/', userRoute)
app.use('/', clientRoute)
app.use('/', partnerRoute)

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://127.0.0.1:${port}`)
})
