import { Elysia } from 'elysia';
import { healthController } from './controllers/healthController';

export const routes = new Elysia()
  .use(healthController);