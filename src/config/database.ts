import { Pool, PoolConfig } from 'pg';
import { config } from './env';

const poolConfig: PoolConfig = {
  connectionString: config.database.url,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const db = new Pool(poolConfig);

export const connectDB = async () => {
  try {
    const client = await db.connect();
    console.log('✅ Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

export const closeDB = async () => {
  await db.end();
  console.log('🔌 Database connection closed');
};