import { Response } from 'express';

export class ApiError extends Error {
  public statusCode: number;
  public errors?: string[];

  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

export const sendSuccess = (res: Response, message: string, statusCode: number = 200, data?: any) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data })
  });
};

export const sendError = (res: Response, message: string, statusCode: number = 500, errors?: any) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};
