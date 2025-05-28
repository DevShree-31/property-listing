import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { sendError, sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../utils/logger";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export async function registerUser(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await UserModel.findOne({ email })
        if (user) {
            return sendError(res, "User already exist", StatusCodes.CONFLICT)
        }

        const createdUser = await UserModel.create({ name, email, passwordHash: hashedPassword })

        const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return sendSuccess(res, "User created successfully", StatusCodes.OK, {
            token,
            user: createdUser
        })
    } catch (error) {
        logger.error(error.message)
        return sendError(res, "Error occured while registering a user", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}