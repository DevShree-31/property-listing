import { Document, model, Schema, Types } from 'mongoose';

export enum PropertyType {
  Apartment = 'Apartment',
  Bungalow = 'Bungalow',
  Villa = 'Villa',
}

export enum Furnishing {
  Furnished = 'Furnished',
  Unfurnished = 'Unfurnished',
  Semi = 'Semi',
}

export enum ListedBy {
  Builder = 'Builder',
  Owner = 'Owner',
  Agent = 'Agent',
}

export enum ListingType {
  Sale = 'Sale',
  Rent = 'Rent',
}

export interface IProperty extends Document {
  _id: string;
  title: string;
  type: PropertyType ;
  price: number;
  state: string;
  city: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[]; 
  furnished: Furnishing;
  availableFrom: Date;
  listedBy: ListedBy;
  tags: string[]; 
  colorTheme: string;
  rating: number;
  isVerified: boolean;
  listingType: ListingType;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>({
  _id: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: PropertyType },
  price: { type: Number, required: true, min: 0 },
  state: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  areaSqFt: { type: Number, required: true, min: 0 },
  bedrooms: { type: Number, required: true, min: 0 },
  bathrooms: { type: Number, required: true, min: 0 },
  amenities: [{ type: String, trim: true }],
  furnished: { type: String, enum: Furnishing, required: true },
  availableFrom: { type: Date, required: true },
  listedBy: { type: String, enum: ListedBy, required: true },
  tags: [{ type: String, trim: true }],
  colorTheme: { type: String, trim: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isVerified: { type: Boolean, default: false },
  listingType: { type: String, enum: ListingType, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
   toJSON: { virtuals: true }
});


export const PropertyModel = model<IProperty>('Property', PropertySchema);