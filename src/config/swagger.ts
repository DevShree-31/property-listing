import { configDotenv } from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
configDotenv();
export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property Listing System API',
      version: '1.0.0',
      description: 'A comprehensive backend system for managing property listings with advanced features including user authentication, favorites, and property recommendations.',
      contact: {
        name: 'API Support',
        email: 'support@propertylisting.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from login endpoint'
        }
      },
      schemas: {
        Property: {
          type: 'object',
          required: [
            'title', 'type', 'price', 'state', 'city', 'areaSqFt',
            'bedrooms', 'bathrooms', 'furnished', 'availableFrom', 'listedBy', 'listingType'
          ],
          properties: {
            _id: { type: 'string', example: 'PROP001' },
            title: { type: 'string', example: 'Beautiful 3BHK Apartment' },
            type: { type: 'string', enum: ['Apartment', 'Bungalow'], example: 'Apartment' },
            price: { type: 'number', example: 2500000 },
            state: { type: 'string', example: 'Maharashtra' },
            city: { type: 'string', example: 'Mumbai' },
            areaSqFt: { type: 'number', example: 1200 },
            bedrooms: { type: 'number', example: 3 },
            bathrooms: { type: 'number', example: 2 },
            amenities: { type: 'array', items: { type: 'string' }, example: ['Parking', 'Gym', 'Swimming Pool'] },
            furnished: { type: 'string', enum: ['Furnished', 'Unfurnished'], example: 'Furnished' },
            availableFrom: { type: 'string', format: 'date', example: '2024-01-15' },
            listedBy: { type: 'string', enum: ['Builder', 'Owner', 'Agent'], example: 'Owner' },
            tags: { type: 'array', items: { type: 'string' }, example: ['luxury', 'new', 'prime-location'] },
            colorTheme: { type: 'string', example: '#FF5733' },
            rating: { type: 'number', minimum: 0, maximum: 5, example: 4.5 },
            isVerified: { type: 'boolean', example: true },
            listingType: { type: 'string', enum: ['sale', 'rent'], example: 'sale' },
            createdBy: { type: 'string', example: '507f1f77bcf86cd799439011' }
          }
        },
        Register:{
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password:{type:'string',example:"Admin@123"}
        }
      },
        Login:{
            type: 'object',
          required: [ 'email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password:{type:'string',example:"Admin@123"}
        }
      },
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            favorites: { type: 'array', items: { type: 'string' }, example: ['PROP001', 'PROP002'] },
            recommendationsReceived: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  from: { type: 'string', example: '507f1f77bcf86cd799439012' },
                  propertyId: { type: 'string', example: 'PROP001' },
                  recommendedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            errors: { type: 'array', items: { type: 'string' } }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['src/v1/routes/*.ts'], // Corrected path to the API docs from src/config/swagger.ts
};

export const swaggerSpec = swaggerJsdoc(options);