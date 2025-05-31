export interface PropertyFilters {
  city?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  isVerified?: boolean;
  availableFrom?: { $gte: Date };
  price?: { $gte?: number; $lte?: number };
  type?: { $in: string[] };
  listingType?: { $in: string[] };
  furnished?: { $in: string[] };
  tags?: { $in: string[] };
}