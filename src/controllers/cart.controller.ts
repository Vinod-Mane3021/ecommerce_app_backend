import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "../middlewares/auth.middlewares";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";

const addToCart = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        if(!userId || !productId || !quantity || quantity < 1) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "all felid must required").sendResponse(res);
        }




        return new ApiResponse(
            HttpStatusCode.OK,
            "SUCCESS",
            "Cart added successfully"
        ).sendResponse(res)
    }
)

export { addToCart }