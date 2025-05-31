import { NextFunction, Request, Response } from "express";
import { createPropertySchema, updatePropertySchema } from "../v1/validations/property.validation";
import { validationError } from "../utils/validation.error";


export const validateProperty=async(req:Request,res:Response,next:NextFunction)=>{
    const {error}=createPropertySchema.validate(req.body)
     validationError(res,error)
    next()
}

export const validateUpdateProperty=async(req:Request,res:Response,next:NextFunction)=>{
    const {error}=updatePropertySchema.validate(req.body)
     validationError(res,error)
    next()
}