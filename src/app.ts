import express from 'express'
import helmet from 'helmet'
import { corsConfig, errorHandler, notFoundHandler } from './middlewares'
import { healthRouter } from './routes'
import { displayServerInfo } from './utils'

const port = process.env.PORT ?? 3000
const app = express()

// Security
app.use(helmet())

// CORS Configuration
app.use(corsConfig)

// Middlewares
app.use(express.json())

// Routes
app.use('/api', healthRouter)

// Error handlers
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
app.listen(port, () => {
	displayServerInfo(port)
})
