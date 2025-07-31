import jwt from '@elysiajs/jwt';
import { config } from '../config/env';

export const jwtConfig = jwt({
  name: 'jwt',
  secret: config.jwt.secret,
  exp: config.jwt.expiresIn
});

export const authGuard = (app: any) => app
  .derive(async ({ jwt, headers }: any) => {
    const authorization = headers.authorization;
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Unauthorized: Missing or invalid token format');
    }
    
    const token = authorization.substring(7);
    
    try {
      const payload = await jwt.verify(token);
      if (!payload) {
        throw new Error('Unauthorized: Invalid token');
      }
      
      return {
        user: payload
      };
    } catch (error) {
      throw new Error('Unauthorized: Token verification failed');
    }
  });