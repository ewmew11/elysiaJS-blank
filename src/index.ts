import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { config } from './config/env';
import { swaggerConfig } from './config/swagger';
import { routes } from './routes';

const app = new Elysia()
  .use(swagger(swaggerConfig))
  .use(routes)
  .get('/', () => ({ 
    message: 'Hello Elysia!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  }))
  .listen(config.port);

console.log(
  `🦊 Elysia is running at http://localhost:${config.port}`
);

export default app;