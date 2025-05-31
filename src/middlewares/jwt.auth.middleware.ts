import { NextFunction, Response } from "express";
import { sendError } from "../utils/helper";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import { IUser, UserModel } from "../v1/models/user.model";
import { AuthRequest } from "../types/auth/authTypes";
import mongoose from "mongoose";
import { PropertyModel } from "../v1/models/property.model";

export async function jwtAuthMiddleware(req:any, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    console.log("Auth header extracted", authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log("Separated the token",token)
    try {
        if (!token) {
            return sendError(res, "Access token is required", StatusCodes.UNAUTHORIZED)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as { userId: string };
        console.log("Id of the user",decoded.userId)
        const user = await UserModel.findOne({ _id: decoded.userId })
        console.log("User details",user)
        if (!user) {
            return sendError(res, "Invalid token", StatusCodes.UNAUTHORIZED)
        }
        req.user = user
        next()
    } catch (error) {
        return sendError(res, "Invalid or expired token", StatusCodes.FORBIDDEN)
    }
}

export async function permissionMiddleware(req: any, res: Response, next: NextFunction) {
    try {
        const { _id } = req.user
        const propertyId = new mongoose.Types.ObjectId(req.params.id)

        const property = await PropertyModel.findById({ _id: propertyId })
        if (!property || property.createdBy.toString() != _id.toString()) {
            return sendError(res, "Permission denied", StatusCodes.UNAUTHORIZED)
        }
        next()
    } catch (error:any) {
        return sendError(res, "Error occured while verifying the permission", StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
}