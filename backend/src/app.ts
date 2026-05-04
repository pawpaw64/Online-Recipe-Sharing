import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'
import { env } from './config/env'
import apiRouter from './routes/index'
import { errorHandler } from './middlewares/errorHandler.middleware'

const app = express()
const allowedOrigins = new Set([
  env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])
const isDev = env.NODE_ENV !== 'production'

// Security
app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (isDev) {
        callback(null, true)
        return
      }

      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked request from origin: ${origin}`))
    },
    credentials: true,
  }),
)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Static file serving for local uploads
// Allow cross-origin image loading (frontend is on a different port/origin)
app.use('/uploads', (_req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
}, express.static(path.join(process.cwd(), 'uploads')))

// API routes
app.use('/api/v1', apiRouter)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404
app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Not found', code: 'NOT_FOUND' } })
})

// Global error handler
app.use(errorHandler)

export default app
