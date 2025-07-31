import { Elysia, t } from 'elysia';
import { HealthService } from '../services/healthService';

const healthService = new HealthService();

export const healthController = new Elysia({ prefix: '/health' })
  .get('/', async () => {
    const healthStatus = await healthService.checkHealth();
    
    return {
      ...healthStatus,
      message: healthStatus.status === 'healthy' ? 'All systems operational' : 'Some systems are down'
    };
  }, {
    detail: {
      tags: ['Health'],
      summary: 'Health check endpoint',
      description: 'Returns the current health status of the application and its dependencies',
      responses: {
        200: {
          description: 'Health check result',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', enum: ['healthy', 'unhealthy'] },
                  timestamp: { type: 'string', format: 'date-time' },
                  message: { type: 'string' },
                  services: {
                    type: 'object',
                    properties: {
                      database: {
                        type: 'object',
                        properties: {
                          status: { type: 'string', enum: ['up', 'down'] },
                          responseTime: { type: 'number' }
                        }
                      },
                      api: {
                        type: 'object',
                        properties: {
                          status: { type: 'string', enum: ['up'] },
                          uptime: { type: 'number' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  .get('/ready', async () => {
    const healthStatus = await healthService.checkHealth();
    
    if (healthStatus.status === 'healthy') {
      return { ready: true, message: 'Service is ready to accept requests' };
    } else {
      throw new Error('Service not ready');
    }
  }, {
    detail: {
      tags: ['Health'],
      summary: 'Readiness probe',
      description: 'Returns 200 if service is ready to accept requests, 500 otherwise'
    }
  })
  .get('/live', () => {
    return { alive: true, message: 'Service is alive' };
  }, {
    detail: {
      tags: ['Health'],
      summary: 'Liveness probe',
      description: 'Returns 200 if service is alive and running'
    }
  });