# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses Bun as the runtime and package manager:

- **Development server**: `bun run dev` - Starts the development server with hot reload
- **Install dependencies**: `bun install` - Install all project dependencies
- **Start production**: `bun start` or `bun run src/index.ts` - Run the application in production mode

Note: This project appears to be missing a main entry point file (`src/index.ts`) and package.json scripts. Check with the user about the correct startup commands.

## Architecture Overview

This is an Elysia-based API server built on Bun runtime with the following architecture:

### Core Framework Stack
- **Runtime**: Bun (high-performance JavaScript runtime)
- **Framework**: Elysia (TypeScript-first web framework)
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT Bearer tokens via `@elysiajs/jwt`
- **Documentation**: Auto-generated Swagger/OpenAPI via `@elysiajs/swagger`

### Project Structure
- `src/config/` - Configuration management (environment, database, swagger)
- `src/controllers/` - HTTP request handlers (currently health endpoints)
- `src/middleware/` - Custom middleware (JWT authentication)
- `src/services/` - Business logic layer (health monitoring)
- `src/routes.ts` - Route definitions and controller registration
- `src/types/` - TypeScript type definitions (currently empty)

### Configuration System
Environment configuration is centralized in `src/config/env.ts` with sensible defaults:
- Server runs on port 3000 by default
- JWT secrets and database connections configurable via environment variables
- Swagger documentation auto-configured

### Health Monitoring
Comprehensive health check system with three endpoints:
- `/health` - Complete system status with database connectivity and response times
- `/health/ready` - Kubernetes-compatible readiness probe
- `/health/live` - Kubernetes-compatible liveness probe

### Authentication Pattern
JWT middleware is available in `src/middleware/jwt.ts` for protecting endpoints. Apply authentication by importing and using the JWT middleware in route definitions.

### Database Integration
Database connection is configured in `src/config/database.ts` with PostgreSQL client pooling. Health service demonstrates proper connection management with automatic cleanup.

## Development Notes

- The project uses TypeScript with Elysia's type system for full type safety
- All HTTP handlers include OpenAPI documentation schemas for auto-generated docs
- Database operations should follow the connection pool pattern shown in health service
- Environment variables should be defined in `src/config/env.ts` with defaults
- New controllers should follow the prefix pattern (e.g., `{ prefix: '/api' }`)