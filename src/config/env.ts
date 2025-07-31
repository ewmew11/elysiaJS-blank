export const config = {
  port: Number(process.env.PORT) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/elysia_db',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'elysia_db'
  },
  swagger: {
    documentation: {
      info: {
        title: 'Elysia API',
        version: '1.0.0',
        description: 'API documentation for Elysia application'
      },
      tags: [
        { name: 'App', description: 'General endpoints' }
      ]
    }
  }
};