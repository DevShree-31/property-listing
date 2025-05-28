import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "../v1/validations/auth.validation";
import { sendError } from "../utils/helper";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const errors = error.details.map(detail => ({
      field:detail.path[0],
      message:detail.message
    }))
    
    return sendError(res, "Validation Error", StatusCodes.BAD_REQUEST,errors)
  }
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body)
  if (error) {
    const errors = error.details.map(detail => ({
      field:detail.path[0],
      message:detail.message
    }))
    logger.error("Error occured while validating the body", { errors })
    return sendError(res, "Validation Error", StatusCodes.BAD_REQUEST, errors)
  }
  next()
}
