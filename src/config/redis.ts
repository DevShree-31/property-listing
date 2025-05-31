import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

const redis: RedisClientType = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 5000,
    reconnectStrategy: (retries) => {
      if (retries > 3) return new Error('Retry limit exceeded');
      return Math.min(retries * 100, 3000);
    },
  },
});

export const connectRedis = async (): Promise<void> => {
  try {
    redis.on('error', (error) => logger.error('Redis error:', error));
    redis.on('connect', () => logger.info('✅ Redis connected'));
    redis.on('reconnecting', () => logger.info('♻️ Redis reconnecting...'));

    await redis.connect();
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    await redis.quit();
    logger.info('Redis disconnected');
  } catch (error) {
    logger.error('Redis disconnection error:', error);
  }
};

export default redis;
