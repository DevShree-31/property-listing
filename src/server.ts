
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { swaggerSpec } from './config/swagger';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { StatusCodes } from 'http-status-codes';
import  authRoutes from "./v1/routes/auth.route"
import propertyRoutes from './v1/routes/property.route'
import favoriteRoutes from './v1/routes/property-favourite.route'
dotenv.config();

const app=express()

const PORT = process.env.PORT || 3000;

app.use(helmet())

app.use(cors({
  origin: '*',//based on the frontend implementation we can pass the origin that can access these api's
  credentials: true
}));

app.use(rateLimiter);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Property Listing API'
}));


app.get('/health',(req,res)=>{
    res.status(StatusCodes.OK).json({
        status:"OK",
        timeStamp:new Date().toISOString(),
        environment:process.env.NODE_ENV||'development'
    })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/property',propertyRoutes)
app.use('/api/v1/favorite',favoriteRoutes)
async function startServer() {
  try {
    await connectDatabase();
    await connectRedis();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;