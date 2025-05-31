import { Response } from "express";
import { AuthRequest } from "../../types/auth/authTypes";
import { UserModel } from "../models/user.model";
import { sendError, sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { PropertyModel } from "../models/property.model";
import mongoose from "mongoose";
 async function addToFavorites (req: AuthRequest, res: Response)  {
  const userId = req.user._id;

  const propertyId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const property = await PropertyModel.findById(propertyId);
    if (!property) return sendError(res, "Property not found", StatusCodes.NOT_FOUND);

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: propertyId } },
      { new: true }
    ).populate('favorites');

    return sendSuccess(res, "Property added to favourite successfully", StatusCodes.OK, { favourites: user.favorites });
  } catch (err) {
    return sendError(res, "Error occured while adding property to favourite", StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};

async function removeFromFavorites(req: AuthRequest, res: Response)  {
  const userId = req.user._id;
  const propertyId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { favorites: propertyId } },
      { new: true }
    ).populate('favorites');
    return sendSuccess(res, "Property removed from favourite successfully", StatusCodes.OK);;
  } catch (err) {
    return sendError(res, "Error occured while removing property to favourite", StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};



async function getFavoriteProperties(req: AuthRequest, res: Response) {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).populate('favorites');
    if (!user) return sendError(res, "Property not found", StatusCodes.NOT_FOUND);

    return sendSuccess(res, "Favorite properties retrieved successfully", StatusCodes.OK, { favorites: user.favorites });
  } catch (err) {
    return sendError(res, "Error occured while retrieving all the favourites for user", StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};



export {removeFromFavorites,getFavoriteProperties,addToFavorites}