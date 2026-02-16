import type { NextFunction, Request, Response } from 'express'

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * Global error handler middleware
 * Catches all unhandled errors and returns a consistent JSON response
 *
 * In development: Returns detailed error message
 * In production: Returns generic error message for security
 */
interface ErrorWithStatus extends Error {
	status?: number
	statusCode?: number
}

export const errorHandler = (
	err: ErrorWithStatus,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	// Log error for monitoring
	console.error('❌ Error:', err)

	// Get status code from error or default to 500
	const statusCode = err.status || err.statusCode || 500

	// Send JSON response
	res.status(statusCode).json({
		success: false,
		error: isDevelopment ? err.message : 'Internal server error',
		...(isDevelopment && { stack: err.stack }),
	})
}
