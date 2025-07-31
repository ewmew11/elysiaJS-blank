import { db } from '../config/database';

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  services: {
    database: {
      status: 'up' | 'down';
      responseTime?: number;
    };
    api: {
      status: 'up';
      uptime: number;
    };
  };
}

export class HealthService {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  async checkHealth(): Promise<HealthCheckResult> {
    const timestamp = new Date().toISOString();
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);

    const databaseHealth = await this.checkDatabase();

    const overallStatus = databaseHealth.status === 'up' ? 'healthy' : 'unhealthy';

    return {
      status: overallStatus,
      timestamp,
      services: {
        database: databaseHealth,
        api: {
          status: 'up',
          uptime
        }
      }
    };
  }

  private async checkDatabase(): Promise<{ status: 'up' | 'down'; responseTime?: number }> {
    try {
      const startTime = Date.now();
      const client = await db.connect();
      await client.query('SELECT 1');
      client.release();
      const responseTime = Date.now() - startTime;

      return {
        status: 'up',
        responseTime
      };
    } catch (error) {
      console.error('Database health check failed:', error);
      return {
        status: 'down'
      };
    }
  }
}