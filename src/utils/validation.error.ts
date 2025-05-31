import { StatusCodes } from "http-status-codes"
import { sendError } from "./helper"
import { Response } from "express"

export const validationError=async(res:Response,error:any)=>{
      if (error) {
        interface ValidationErrorDetail {
          path: string[];
          message: string;
        }

        interface ValidationErrorContainer {
          details: ValidationErrorDetail[];
        }

        const errors: { field: string; message: string }[] = (error as ValidationErrorContainer).details.map((detail: ValidationErrorDetail): { field: string; message: string } => ({
          field: detail.path[0],
          message: detail.message
        }))
        
        return sendError(res, "Validation Error", StatusCodes.BAD_REQUEST,errors)
      }
}