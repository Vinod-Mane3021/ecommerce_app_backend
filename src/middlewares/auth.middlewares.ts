import { Request, Response, NextFunction } from "express";
import { Schema, Types } from "mongoose";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";
import jwt from 'jsonwebtoken'
import { Keys } from "../config/keys";
import { findUserById } from "../services/user.service";

export interface authRequest extends Request {
    userId: Types.ObjectId
}

interface JwtPayload {
    id: string,
    email: string,
}

const authenticate = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
        const token = req.headers.token as string;
        if(!token) {
            return new ApiResponse(HttpStatusCode.UNAUTHORIZED, "UNAUTHORIZED", "Token missing").sendResponse(res)
        }

        const decoded = jwt.verify(token, Keys.jwt.secret) as JwtPayload
        const id = decoded.id;
        const email = decoded.email

        // console.log("decoded : ", decoded)

        const user = await findUserById(id)
        if(!user) {
            return new ApiResponse(HttpStatusCode.UNAUTHORIZED, "UNAUTHORIZED", "user not authenticated").sendResponse(res)
        }

        req.userId = user._id;;

        next()
    }
)

export { authenticate }





