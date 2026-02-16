# Express API Template

A modern, production-ready Express.js template for building REST APIs with TypeScript, comprehensive CORS configuration, and beautiful developer experience.

## Features

- **Express 5** - Latest version with improved performance and stability
- **TypeScript** - Full type safety with strict mode enabled
- **CORS Configuration** - Production-ready CORS setup with flexible origin management
- **Beautiful Console Output** - Visual server startup information with network addresses
- **Built-in Middlewares** - Security headers, CORS, error handling, and 404 responses
- **Hot Reload** - Fast development with `tsx` watch mode
- **ESM Support** - Modern ES modules throughout
- **Biome** - Fast linting and formatting
- **Path Aliases** - Clean imports with `@/*` prefix

## Quick Start

### Installation

```bash
pnpm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
PORT=3000
NODE_ENV=development
APP_NAME=My API
ALLOWED_ORIGINS=
```

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The server will display a beautiful startup message with:
- 🚀 Application name (customizable via `APP_NAME`)
- Timestamp when server started
- Local URL (http://localhost:3000)
- Network URL (accessible from other devices on your network)

**Note:** This template uses Node.js 20+ native `.env` file support with the `--env-file` flag.

### Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── middlewares/
│   ├── corsConfig.ts         # CORS configuration
│   ├── errorHandler.ts       # Global error handler
│   ├── notFoundHandler.ts    # 404 error handler
│   └── index.ts              # Middleware exports
├── routes/
│   ├── health.ts             # Health check endpoint
│   └── index.ts              # Route exports
├── utils/
│   ├── serverStartup.ts      # Server startup message utilities
│   └── index.ts              # Utility exports
└── app.ts                    # Express application entry point
```

## API Endpoints

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment mode (`development` or `production`) | `development` | No |
| `APP_NAME` | Application name displayed in server startup message | `Express Server` | No |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins for production | - | No |

### CORS Configuration

The template includes a simple and effective CORS setup in `src/middlewares/corsConfig.ts`:

- ✅ **Development**: Allows all origins automatically
- ✅ **Production**: Validates against `ALLOWED_ORIGINS` environment variable
- ✅ **Credentials**: Supports cookie-based authentication
- ✅ **Flexible**: Allows requests with no origin (mobile apps, curl)

**Configure for Production:**

Set allowed origins as a comma-separated list in `.env`:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Development:**

No configuration needed! In development mode, all origins are allowed automatically.

## Built-in Middlewares

### `helmet`
Adds secure HTTP headers to protect against common vulnerabilities.

```typescript
// Applied first for security
app.use(helmet())
```

Automatically sets headers like:
- `Content-Security-Policy`
- `X-DNS-Prefetch-Control`
- `X-Frame-Options`
- `Strict-Transport-Security`
- And more...

### `corsConfig`
Configures CORS with simple and effective origin management:
- **Development mode**: Allows all origins automatically
- **Production mode**: Validates against `ALLOWED_ORIGINS` environment variable

```typescript
// Applied after helmet to handle preflight requests
app.use(corsConfig)
```

### `errorHandler`
Global error handler that catches all unhandled errors and returns consistent JSON responses.

```typescript
// Applied last, after all routes
app.use(errorHandler)
```

**Behavior:**
- In **development**: Returns detailed error message and stack trace
- In **production**: Returns generic "Internal server error" message for security

**Example error response:**
```json
{
  "success": false,
  "error": "Something went wrong",
  "stack": "Error: Something went wrong\n    at ..." // Only in development
}
```

### `notFoundHandler`
Returns a structured 404 response for undefined routes.

```typescript
// Applied before error handler
app.use(notFoundHandler)
```

## Adding Routes

### 1. Create Route File

Create a new file in `src/routes/`:

```typescript
// src/routes/users.ts
import { type Request, type Response, Router } from 'express'

export const usersRouter: Router = Router()

usersRouter.get('/users', (_req: Request, res: Response) => {
  res.json({ 
    success: true,
    data: [] 
  })
})

usersRouter.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body
  
  res.status(201).json({ 
    success: true,
    message: 'User created',
    data: { name, email }
  })
})
```

### 2. Export Route

Add to `src/routes/index.ts`:

```typescript
export * from './health'
export * from './users'
```

### 3. Register Route

Add to `src/app.ts`:

```typescript
import { healthRouter, usersRouter } from './routes'

app.use('/api', healthRouter)
app.use('/api', usersRouter)
```

## Adding Middlewares

### 1. Create Middleware File

```typescript
// src/middlewares/logger.ts
import { type NextFunction, type Request, type Response } from 'express'

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.path}`)
  next()
}
```

### 2. Export Middleware

Add to `src/middlewares/index.ts`:

```typescript
export * from './corsConfig'
export * from './logger'
export * from './notFoundHandler'
```

### 3. Use Middleware

Apply globally or to specific routes:

```typescript
import { loggerMiddleware } from './middlewares'

// Apply globally to all routes
app.use(loggerMiddleware)

// Apply to specific routes
app.use('/api/admin', loggerMiddleware, adminRouter)

// Apply to a single route
app.get('/api/users', loggerMiddleware, (req, res) => {
  res.json({ success: true, data: [] })
})
```

## Response Patterns

### Success Response

```json
{
  "success": true,
  "data": { /* your data */ }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

### Not Found

```json
{
  "error": "Route not found",
  "path": "/api/unknown",
  "method": "GET"
}
```

## Development Tools

### Type Checking

```bash
pnpm type-check
```

Validates TypeScript types without building. Uses `tsc --noEmit` for zero-overhead type validation.

### Linting & Formatting

```bash
pnpm lint-format
```

Runs Biome to check and fix code style issues.

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload (loads .env automatically) |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server (loads .env automatically) |
| `pnpm type-check` | Validate TypeScript types |
| `pnpm lint-format` | Lint and format code |

## Best Practices

### Error Handling

Always use try-catch for async operations:

```typescript
import { type Request, type Response } from 'express'

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await getUsers()
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch users' 
    })
  }
})
```

Or use the global error handler by passing errors to `next()`:

```typescript
import { type NextFunction, type Request, type Response } from 'express'

app.get('/api/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers()
    res.json({ success: true, data: users })
  } catch (error) {
    next(error) // Global error handler will catch this
  }
})
```

You can also throw custom errors with status codes:

```typescript
import { type NextFunction, type Request, type Response } from 'express'

app.get('/api/users/:id', (req: Request, res: Response, next: NextFunction) => {
  const user = findUser(req.params.id)
  
  if (!user) {
    const error = new Error('User not found')
    ;(error as any).status = 404
    return next(error)
  }
  
  res.json({ success: true, data: user })
})
```

### Input Validation

Validate request data before processing:

```typescript
import { type Request, type Response } from 'express'

app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    })
  }

  // Process valid data
})
```

### Type Safety

Define types for your data:

```typescript
import { type Request, type Response } from 'express'

interface User {
  id: number
  name: string
  email: string
}

app.get('/api/users/:id', (req: Request, res: Response) => {
  const user: User = { 
    id: Number(req.params.id),
    name: 'John',
    email: 'john@example.com'
  }
  
  res.json({ success: true, data: user })
})
```

## Production Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Configure production origins in CORS (`ALLOWED_ORIGINS`)
- [ ] Remove or protect debug logging
- [ ] Set appropriate rate limiting (if needed)
- [ ] Review helmet configuration for your use case
- [ ] Set up proper error logging service (e.g., Sentry, LogRocket)
- [ ] Configure database connection pooling
- [ ] Set up health checks and monitoring
- [ ] Review and update CORS allowed origins
- [ ] Configure appropriate timeouts

## License

MIT