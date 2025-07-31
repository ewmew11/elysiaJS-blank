import { swagger } from '@elysiajs/swagger';
import { config } from './env';

export const swaggerConfig = swagger({
  documentation: {
    ...config.swagger.documentation,
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  scalarConfig: {
    theme: 'purple'
  }
});