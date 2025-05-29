import { Request } from "express";
import { IUser } from "../../v1/models/user.model";

export interface AuthRequest extends Request{
    user:IUser
}