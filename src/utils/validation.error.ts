import { StatusCodes } from "http-status-codes"
import { sendError } from "./helper"
import { Response } from "express"

export const validationError=async(res:Response,error)=>{
      if (error) {
        const errors = error.details.map(detail => ({
          field:detail.path[0],
          message:detail.message
        }))
        
        return sendError(res, "Validation Error", StatusCodes.BAD_REQUEST,errors)
      }
}