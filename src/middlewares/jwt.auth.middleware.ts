import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { sendError } from "../utils/helper";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import { IUser, UserModel } from "../v1/models/user.model";
import { AuthRequest } from "../types/auth/authTypes";

export async function jwtAuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    logger.log("Auth header extracted", authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    try {
        if (!token) {
            return sendError(res, "Access token is required", StatusCodes.UNAUTHORIZED)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string }
        const user: IUser = await UserModel.findOne({ id: decoded.userId })

        if (!user) {
            return sendError(res, "Invalid token", StatusCodes.UNAUTHORIZED)
        }
        req.user = user
        logger.log("AuthMiddleware", `Token extracted ${token}`)
        next()
    } catch (error) {
        return sendError(res, "Invalid or expired token", StatusCodes.FORBIDDEN)
    }

}