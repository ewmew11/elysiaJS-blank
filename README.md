# Elysia API Server

A modern, high-performance API server built with Elysia and Bun runtime, featuring JWT authentication, PostgreSQL database integration, and comprehensive health monitoring.

## Features

- 🚀 **High Performance**: Built on Bun runtime and Elysia framework
- 🔐 **JWT Authentication**: Secure token-based authentication middleware
- 🗄️ **Database Integration**: PostgreSQL with connection pooling
- 📚 **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- 🔍 **Health Monitoring**: Comprehensive health checks for system monitoring
- ⚙️ **Environment Configuration**: Flexible configuration management

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Environment configuration
│   ├── database.ts     # Database connection setup
│   └── swagger.ts      # Swagger documentation config
├── controllers/
│   └── healthController.ts  # Health check endpoints
├── middleware/
│   └── jwt.ts          # JWT authentication middleware
├── services/
│   └── healthService.ts     # Health monitoring service
├── routes.ts           # Route definitions
└── index.ts           # Application entry point
```

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) runtime installed
- PostgreSQL database (optional, for full functionality)

### Installation

1. Clone or create the project:
```bash
bun create elysia ./elysia-example
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL=postgresql://localhost:5432/elysia_db
# ... other variables
```

### Development

Start the development server:
```bash
bun run dev
```

The server will start at http://localhost:3000

## API Endpoints

### Core Endpoints
- `GET /` - Hello world endpoint
- `GET /swagger` - API documentation

### Health Check Endpoints
- `GET /health` - Complete system health status
- `GET /health/ready` - Readiness probe (K8s compatible)
- `GET /health/live` - Liveness probe (K8s compatible)

## Authentication

The API uses JWT Bearer token authentication. Include the token in requests:

```bash
curl -H "Authorization: Bearer <your-jwt-token>" http://localhost:3000/protected-endpoint
```

## Database

The application uses PostgreSQL with connection pooling. Configure your database connection in the `.env` file or environment variables.

## Documentation

API documentation is automatically generated and available at:
- http://localhost:3000/swagger

## Health Monitoring

The application provides comprehensive health monitoring:

- **Database connectivity** with response time metrics
- **API uptime** tracking
- **Overall system status** aggregation

Perfect for deployment monitoring and load balancer health checks.