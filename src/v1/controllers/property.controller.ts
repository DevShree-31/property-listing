import {  Response } from "express";
import { AuthRequest } from "../../types/auth/authTypes";
import { UserModel } from "../models/user.model";
import { sendError, sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { IProperty, PropertyModel } from "../models/property.model";
import { logger } from "../../utils/logger";
 async function createProperty(req: AuthRequest, res: Response) {
    try {
        console.log("Entered create property function")
        const { _id } = req.user
        const propertyDetails = req.body
        const user = await UserModel.findById({ _id })
        console.log("Details of the property",propertyDetails)
        if (!user) {
            return sendError(res, "User not found", StatusCodes.NOT_FOUND)
        }

        const property:IProperty = await PropertyModel.create({ ...propertyDetails, createdBy: user._id })
        console.log(property)
        return sendSuccess(res, "Property Created Successfully", StatusCodes.CREATED, property)
    } catch (error) {
        logger.error(`${error}`)
        return sendError(res, "Error occured while creating property", StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
}




export {createProperty}

