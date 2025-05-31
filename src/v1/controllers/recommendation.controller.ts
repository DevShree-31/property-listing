import { Response } from "express";
import { AuthRequest } from "../../types/auth/authTypes";
import { UserModel } from "../models/user.model";
import { RecommendationModel } from "../models/recommendation.model";
import { sendError, sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { PropertyModel } from "../models/property.model";
import mongoose from "mongoose";
import redis from "../../config/redis";

async function sendRecommendation(req: AuthRequest, res: Response) {
    try {
        const id = req.user._id
        const { to, message, propertyId: propertyIdStr } = req.body
        const propertyId = new mongoose.Types.ObjectId(propertyIdStr);
        const recommendedTo = await UserModel.findOne({ email: to })
        if (!recommendedTo) {
            return sendError(res, "User does not exist", StatusCodes.NOT_FOUND)
        }
        //check it is already recommended by the user once or not 
        const recommendationAlreadyExistOrNot = await RecommendationModel.findOne({ from: id, to: recommendedTo._id, propertyId })
        if (recommendationAlreadyExistOrNot) {
            return sendError(res, "You have already recommended the property", StatusCodes.CONFLICT)
        }
        const property = await PropertyModel.findById(propertyId)
        console.log(propertyId)
        if (!property) {
            return sendError(res, "Property does not exist", StatusCodes.NOT_FOUND)
        }
        if (property.createdBy === recommendedTo._id) {
            return sendError(res, "Cannot send recommendation: The property is owned by the recommended user.", StatusCodes.CONFLICT)
        }
        const recommendation = new RecommendationModel({
            from: id,
            to: recommendedTo._id,
            message,
            propertyId
        })
        await recommendation.save();
        await recommendation.populate([{ path: 'from' }, { path: 'to' }, { path: 'propertyId' }]);
        await redis.del(`receivedRecommendations:${recommendedTo._id.toString()}`);
        return sendSuccess(res, "Property recommended successfully", StatusCodes.CREATED, { recommendation })
    } catch (error) {
        return sendError(res, "Error while sending recommendation", StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
}

async function receivedRecommedations(req: AuthRequest, res: Response) {
    try {
        const id = req.user._id
        const receivedRecommendations = await RecommendationModel.find({ to: id })
            .populate({ path: 'propertyId' })
            .populate({ path: 'from' });
        const cacheKey = `receivedRecommendations:${id.toString()}`;
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            return sendSuccess(res, "Successfully retrieved all property recommendations (from cache)", StatusCodes.OK, parsedData);
        }
        return sendSuccess(res, "Successfully retrieved all property recommendations", StatusCodes.OK, receivedRecommendations);
    } catch (error) {
        return sendError(res, "Error while retrieving recommendations", StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
}
export { sendRecommendation, receivedRecommedations }