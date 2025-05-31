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
        CreateProperty: {
          type: 'object',
          required: [
            'title', 'type', 'price', 'state', 'city', 'areaSqFt',
            'bedrooms', 'bathrooms', 'furnished', 'availableFrom', 'listedBy', 'listingType'
          ],
          properties: {
            title: { type: 'string', example: 'Beautiful 3BHK Apartment' },
            type: { type: 'string', enum: ['Apartment', 'Bungalow', 'Villa'], example: 'Apartment' },
            price: { type: 'number', example: 2500000 },
            state: { type: 'string', example: 'Maharashtra' },
            city: { type: 'string', example: 'Mumbai' },
            areaSqFt: { type: 'number', example: 1200 },
            bedrooms: { type: 'number', example: 3 },
            bathrooms: { type: 'number', example: 2 },
            amenities: {
              type: 'array',
              items: { type: 'string' },
              example: ['Parking', 'Gym', 'Swimming Pool']
            },
            furnished: { type: 'string', enum: ['Furnished', 'Unfurnished', 'Semi'], example: 'Furnished' },
            availableFrom: { type: 'string', format: 'date', example: '2024-01-15' },
            listedBy: { type: 'string', enum: ['Builder', 'Owner', 'Agent'], example: 'Owner' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['luxury', 'new', 'prime-location']
            },
            colorTheme: { type: 'string', example: '#FF5733' },
            rating: { type: 'number', minimum: 0, maximum: 5, example: 4.5 },
            isVerified: { type: 'boolean', example: true },
            listingType: { type: 'string', enum: ['Sale', 'Rent'], example: 'Sale' }
          }
        },
        UpdateProperty: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Updated Beautiful 3BHK Apartment' },
            price: { type: 'number', example: 2800000 },
            amenities: {
              type: 'array',
              items: { type: 'string' },
              example: ['Parking', 'Gym', 'Swimming Pool', 'Security']
            },
            furnished: { type: 'string', enum: ['Furnished', 'Unfurnished', 'Semi'], example: 'Semi' },
            availableFrom: { type: 'string', format: 'date', example: '2024-02-01' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              example: ['luxury', 'updated', 'prime-location']
            },
            colorTheme: { type: 'string', example: '#33A1FF' },
            rating: { type: 'number', minimum: 0, maximum: 5, example: 4.8 },
            isVerified: { type: 'boolean', example: true },
            listingType: { type: 'string', enum: ['Sale', 'Rent'], example: 'Rent' }
          },
          additionalProperties: false,
          minProperties: 1,
          description: 'At least one field must be provided for update'
        },
        Recommendation: {
          type: 'object',
          required: ['to', 'propertyId'],
          properties: {
            _id: { type: 'string', example: '607f1f77bcf86cd799439011' },
            from: { type: 'string', format: 'ObjectId', example: '507f1f77bcf86cd799439012', description: 'User ID who recommends (from auth token)' },
            to: { type: 'string', format: 'ObjectId', example: '507f1f77bcf86cd799439013', description: 'User ID who receives the recommendation' },
            propertyId: { type: 'string', format: 'ObjectId', example: '607f1f77bcf86cd799439014', description: 'Property being recommended' },
            recommendatedAt: { type: 'string', format: 'date-time', example: '2024-05-31T10:00:00Z' },
            message: { type: 'string', maxLength: 500, example: 'Check out this great property!' }
          }
        },
        sendRecommendation: {
          type: 'object',
          required: ['to', 'propertyId'],
          properties: {
            to: { type: 'string', format: 'email', example: 'patelshre9999@gmail.com', description: 'Email who receives the recommendation' },
            propertyId: { type: 'string', format: 'ObjectId', example: '607f1f77bcf86cd799439014', description: 'Property being recommended' },
            message: { type: 'string', maxLength: 500, example: 'Check out this great property!' }
          }
        },
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
        Register: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: "Admin@123" }
          }
        },
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: "Admin@123" }
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