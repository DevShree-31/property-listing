import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

let redisClient: RedisClientType;

export const connectRedis = async (): Promise<void> => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries) => {
          if (retries > 3) return new Error('Retry limit exceeded');
          return Math.min(retries * 100, 3000);
        },
      },
    });

    redisClient.on('error', (error) => {
      logger.error('Redis connection error:', error);
    });

    redisClient.on('connect', () => {
      logger.info('Redis connected successfully');
    });

    redisClient.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });

    await redisClient.connect();
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
  }
};

export const getRedisClient = (): RedisClientType => redisClient;

export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis disconnected gracefully');
    }
  } catch (error) {
    logger.error('Error disconnecting from Redis:', error);
  }
};
