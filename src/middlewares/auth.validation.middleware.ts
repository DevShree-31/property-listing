import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "../v1/validations/auth.validation";
import { validationError } from "../utils/validation.error";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerSchema.validate(req.body);
 validationError(res,error)
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body)
  validationError(res,error)
  next()
}
