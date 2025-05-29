import { Request, Response } from "express";
import {  UserModel } from "../models/user.model";
import { sendError, sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../utils/logger";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export async function registerUser(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await UserModel.findOne({ email:email.toLowerCase() })
        if (user) {
            return sendError(res, "User already exist", StatusCodes.CONFLICT)
        }

        const createdUser = await UserModel.create({ name, email:email.toLowerCase(), passwordHash: hashedPassword })

        return sendSuccess(res, "User created successfully", StatusCodes.OK, {
            user: createdUser
        })
    } catch (error) {
        logger.error(error.message)
        return sendError(res, "Error occured while registering a user", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        //check wheteher user exist or not
        if (!user) {
            return sendError(res, "User not found", StatusCodes.NOT_FOUND)
        }

        //compare the given password
        const isMatch = bcrypt.compare(password, user.passwordHash)

        if (!isMatch) {
            return sendError(res, "Password does not match", StatusCodes.UNAUTHORIZED)
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return sendSuccess(res, "User Logged in successfully",StatusCodes.OK,{
            token,
            user
        })
    } catch (error) {
        return sendError(res,"Error occured while logging in",StatusCodes.INTERNAL_SERVER_ERROR,error)
    }
}