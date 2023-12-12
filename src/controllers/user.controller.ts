import express, { Request, Response, NextFunction } from "express"
import asyncHandler from "../utils/asyncHandler"
import ApiResponse from "../utils/ApiResponse"
import HttpStatusCode from "../constants/HttpStatusCodes"
import { createUser } from "../services/user.service"

const register = asyncHandler(
    async (req: Request, res: Response) => {
      // Extracting user data from the request body
      const { firstName, lastName, email, mobileNumber, password} = req.body

      // Validating required fields
    if (!firstName || !lastName || !email ||  !mobileNumber || !password) {
      return new ApiResponse(HttpStatusCode.BAD_REQUEST, "FAILED", "All felids are required").sendResponse(res)
    }


    const createdUser = await createUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
    })

    // Sending a success response with the created user data
    return new ApiResponse(HttpStatusCode.CREATED, "CREATED", "User Successfully registered", createdUser).sendResponse(res)
  })

export { register };





