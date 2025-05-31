import { Response } from "express";
import { AuthRequest } from "../../types/auth/authTypes";
import { UserModel } from "../models/user.model";
import { sendError, sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { IProperty, PropertyModel } from "../models/property.model";
import { logger } from "../../utils/logger";
import mongoose from "mongoose";
import { PropertyFilters } from "../../types/auth/property";
async function createProperty(req: any, res: Response) {
    try {
        console.log("Entered create property function")
        const { _id } = req.user
        const propertyDetails = req.body
        const user = await UserModel.findById({ _id })
        console.log("Details of the property", propertyDetails)
        if (!user) {
            return sendError(res, "User not found", StatusCodes.NOT_FOUND)
        }

        const property: IProperty = await PropertyModel.create({ ...propertyDetails, createdBy: user._id })
        console.log(property)
        return sendSuccess(res, "Property Created Successfully", StatusCodes.CREATED, property)
    } catch (error:any) {
        logger.error(`${error}`)
        return sendError(res, "Error occured while creating property", StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
}
async function getProperties(req: any, res: Response): Promise<void> {
  try {
    const {
      city,
      state,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      type,
      listingType,
      isVerified,
      furnished,
      availableFrom,
      tags,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = '1',
      limit = '10',
    } = req.query;

    const filters: PropertyFilters = {};

    // String filters with proper type checking
    if (city && typeof city === 'string') filters.city = city;
    if (state && typeof state === 'string') filters.state = state;

    // Number filters with validation
    if (bedrooms && typeof bedrooms === 'string') {
      const bedroomsNum = Number(bedrooms);
      if (!isNaN(bedroomsNum)) filters.bedrooms = bedroomsNum;
    }
    if (bathrooms && typeof bathrooms === 'string') {
      const bathroomsNum = Number(bathrooms);
      if (!isNaN(bathroomsNum)) filters.bathrooms = bathroomsNum;
    }

    // Boolean filter with proper type checking
    if (isVerified !== undefined && typeof isVerified === 'string') {
      filters.isVerified = isVerified === 'true';
    }

    // Date filter with proper type handling
    if (availableFrom) {
      const availableFromValue = Array.isArray(availableFrom) 
        ? availableFrom[0] 
        : availableFrom;
      
      if (typeof availableFromValue === 'string') {
        const dateValue = new Date(availableFromValue);
        if (!isNaN(dateValue.getTime())) {
          filters.availableFrom = { $gte: dateValue };
        }
      }
    }

    // Price range with validation and proper typing
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice && typeof minPrice === 'string') {
        const minPriceNum = Number(minPrice);
        if (!isNaN(minPriceNum)) filters.price.$gte = minPriceNum;
      }
      if (maxPrice && typeof maxPrice === 'string') {
        const maxPriceNum = Number(maxPrice);
        if (!isNaN(maxPriceNum)) filters.price.$lte = maxPriceNum;
      }
    }

    // Array filters with proper type handling
    if (type) {
      if (Array.isArray(type)) {
        filters.type = { $in: type.filter((t): t is string => typeof t === 'string') };
      } else if (typeof type === 'string') {
        filters.type = { $in: type.split(',') };
      }
    }

    if (listingType) {
      if (Array.isArray(listingType)) {
        filters.listingType = { $in: listingType.filter((lt): lt is string => typeof lt === 'string') };
      } else if (typeof listingType === 'string') {
        filters.listingType = { $in: listingType.split(',') };
      }
    }

    if (furnished) {
      if (Array.isArray(furnished)) {
        filters.furnished = { $in: furnished.filter((f): f is string => typeof f === 'string') };
      } else if (typeof furnished === 'string') {
        filters.furnished = { $in: furnished.split(',') };
      }
    }

    if (tags) {
      if (Array.isArray(tags)) {
        filters.tags = { $in: tags.filter((tag): tag is string => typeof tag === 'string') };
      } else if (typeof tags === 'string') {
        filters.tags = { $in: tags.split(',') };
      }
    }

    // Pagination with validation and proper typing
    const pageStr = Array.isArray(page) ? page[0] : page;
    const limitStr = Array.isArray(limit) ? limit[0] : limit;
    
    const pageNum = Math.max(1, Number(pageStr) || 1);
    const limitNum = Math.max(1, Math.min(100, Number(limitStr) || 10)); // Cap at 100
    const skip = (pageNum - 1) * limitNum;

    // Validate sortBy and sortOrder with proper typing
    const sortByStr = Array.isArray(sortBy) ? sortBy[0] : sortBy;
    const sortOrderStr = Array.isArray(sortOrder) ? sortOrder[0] : sortOrder;
    
    const validSortOrder: 'asc' | 'desc' = sortOrderStr === 'asc' ? 'asc' : 'desc';
    const sortDirection = validSortOrder === 'asc' ? 1 : -1;

    // Create sort object with proper typing
    const sortObject: Record<string, 1 | -1> = { [String(sortByStr)]: sortDirection };

    // Database queries with proper typing
    const [results, total] = await Promise.all([
      PropertyModel.find(filters)
        .sort(sortObject)
        .skip(skip)
        .limit(limitNum),
      PropertyModel.countDocuments(filters)
    ]);

    sendSuccess(res, "Properties retrieved successfully", StatusCodes.OK, {
      total,
      page: pageNum,
      limit: limitNum,
      results,
    });

  } catch (error) {
    console.error('Error in getProperties:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve properties"
    });
  }
}
async function getPropertyById(req: any, res: Response) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const property = await PropertyModel.findById({ _id: id })
        if (!property) {
            return sendError(res, "Property not found", StatusCodes.NOT_FOUND)
        }

        return sendSuccess(res, "Property with the given id retrieved successfully", StatusCodes.OK, property)
    } catch (error:any) {
        return sendError(res, "Error occured while retrieving the property", StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }

}

async function updatePropertyById(req: any, res: Response) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const updatePayload = req.body;

        const property = await PropertyModel.findByIdAndUpdate(
            id,
            updatePayload,
            { new: true } // return the updated document
        );

        if (!property) {
            return sendError(res, "Property not found", StatusCodes.NOT_FOUND);
        }

        return sendSuccess(
            res,
            "Property updated successfully",
            StatusCodes.OK,
            property
        );
    } catch (error:any) {
        console.error(error);
        return sendError(res, "Internal server error", StatusCodes.INTERNAL_SERVER_ERROR,error.message);
    }
}

async function deletePropertyById(req: any, res: Response) {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const property = await PropertyModel.findByIdAndDelete(id);

    if (!property) {
      return sendError(res, "Property not found", StatusCodes.NOT_FOUND);
    }

    return sendSuccess(res, "Property deleted successfully", StatusCodes.OK);
  } catch (error:any) {
    console.error(error);
    return sendError(res, "Internal server error", StatusCodes.INTERNAL_SERVER_ERROR,error.message);
  }
}

export { createProperty, getPropertyById,updatePropertyById,deletePropertyById,getProperties}

