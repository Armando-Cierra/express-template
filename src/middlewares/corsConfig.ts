import cors from 'cors'

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * CORS middleware configuration
 * - In development: allows all origins
 * - In production: validates against ALLOWED_ORIGINS environment variable
 * - Always supports credentials for cookie-based authentication
 *
 * Usage:
 * Set ALLOWED_ORIGINS in .env as comma-separated list:
 * ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
 */
export const corsConfig = cors({
	origin: (origin, callback) => {
		// Allow requests with no origin (mobile apps, curl, same-origin)
		if (!origin) {
			return callback(null, true)
		}

		// In development, allow all origins
		if (isDevelopment) {
			return callback(null, true)
		}

		// In production, check against allowed origins
		const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []

		if (allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			console.warn(`❌ CORS blocked origin: ${origin}`)
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
})
