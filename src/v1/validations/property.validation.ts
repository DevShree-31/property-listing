import Joi from 'joi';
import { PropertyType, Furnishing, ListedBy, ListingType } from '../models/property.model' // Adjust path

export const createPropertySchema = Joi.object({
  title: Joi.string().trim().required(),
  type: Joi.string()
    .valid(...Object.values(PropertyType))
    .required(),
  price: Joi.number().min(0).required(),
  state: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  areaSqFt: Joi.number().min(0).required(),
  bedrooms: Joi.number().min(0).required(),
  bathrooms: Joi.number().min(0).required(),
  amenities: Joi.array().items(Joi.string().trim()).default([]),
  furnished: Joi.string()
    .valid(...Object.values(Furnishing))
    .required(),
  availableFrom: Joi.date().required(),
  listedBy: Joi.string()
    .valid(...Object.values(ListedBy))
    .required(),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  colorTheme: Joi.string().trim().optional(),
  rating: Joi.number().min(0).max(5).default(0),
  isVerified: Joi.boolean().default(false),
  listingType: Joi.string()
    .valid(...Object.values(ListingType))
    .required()
});

export const updatePropertySchema = Joi.object({
  title: Joi.string().trim().optional(),
  price: Joi.number().min(0).optional(),
  amenities: Joi.array().items(Joi.string().trim()).optional(),
  furnished: Joi.string()
    .valid(...Object.values(Furnishing))
    .optional(),
  availableFrom: Joi.date().optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  colorTheme: Joi.string().trim().optional(),
  rating: Joi.number().min(0).max(5).optional(),
  isVerified: Joi.boolean().optional(),
  listingType: Joi.string()
    .valid(...Object.values(ListingType))
    .optional()
}).min(1); // Ensures at least one field is provided for update