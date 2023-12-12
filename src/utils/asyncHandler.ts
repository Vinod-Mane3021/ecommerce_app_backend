import { Request, Response, NextFunction } from "express"
import ApiResponse from "./ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";

/**
 * @param {Function} fun - The asynchronous controller function to be wrapped.
 * @returns - An Express middleware function that handles asynchronous errors.
 */
const asyncHandler = (fun: Function) => {
    // extract req, res and next
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Call the wrapped asynchronous controller function
            await fun(req, res, next);
        } catch (error ) {
            // Handle any errors that occur during the execution of the controller function
            console.log("Error : ", error)
            return new ApiResponse(
                error.code || HttpStatusCode.INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR",
                error.message
            ).sendResponse(res);
        }
    }
}

export default asyncHandler;