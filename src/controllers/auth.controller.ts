import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";
import { createUser, findUserByEmail, findUserByEmailOrMobileNumber } from "../services/user.service";
import { UserModel } from "../models/user.model";
import jwt from 'jsonwebtoken'
import { Keys } from "../config/keys";

/**
 * Handles the registration of a new user.
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {ApiResponse} - JSON response indicating the success or failure of the registration
 */
const register = asyncHandler(async (req: Request, res: Response) => {
  // Extracting user data from the request body
  const { firstName, lastName, email, mobileNumber, password } = req.body;

  // Validating required fields
  if (!firstName || !lastName || !email || !mobileNumber || !password) {
    return new ApiResponse(
      HttpStatusCode.BAD_REQUEST,
      "FAILED",
      "All felids are required"
    ).sendResponse(res);
  }

  // checking if the user already
  const existingUser = await findUserByEmail(email);
  // validating existing user
  if (existingUser) {
    return new ApiResponse(
      HttpStatusCode.BAD_REQUEST,
      "FAILED",
      "user already exist"
    ).sendResponse(res);
  }

  // creating new user
  const createdUser = await createUser({
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNumber: mobileNumber,
    password: password,
  });

  // Sending a success response with the created user data
  return new ApiResponse(
    HttpStatusCode.CREATED,
    "CREATED",
    "User Successfully registered",
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: createdUser.role,
    }
  ).sendResponse(res);
});

/**
 * Handles the user log-in
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {ApiResponse} - JSON response indicating the success or failure of the registration
 */
const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email, mobileNumber, password} = req.body;

    console.log("email :", email)
    
    if((!email || !password) && (!mobileNumber || !password)) {
      return new ApiResponse(HttpStatusCode.BAD_REQUEST, "FAILED", "All felids are required").sendResponse(res);
    }

    const user = await findUserByEmailOrMobileNumber(email, mobileNumber);

    if(!user) {
      return new ApiResponse(HttpStatusCode.UNAUTHORIZED, "UNAUTHORIZED", "No user found for this email address").sendResponse(res);
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect) {
      return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST","Password Incorrect").sendResponse(res);
    }

    // generate token
    const token = await user.generateToken({
      id: user.id,
      email: user.email
    })

    if(!token) {
      return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR","Token not generated").sendResponse(res);
    }

    setTimeout(() => {
      jwt.verify(token, Keys.jwt.secret, (err, decoded) => {
        if (err) {
          console.error('Token has expired:', err.message);
        } else {
          console.log('Token is still valid:', decoded);
        }
      })
    }, 3000)

    // update token
    user.token = token;
    // save user
    await user.save();

    // set the cookie in client
    res.cookie('token', user.token, { domain: 'localhost', path: '/' })
    return new ApiResponse(
      HttpStatusCode.OK,
      "SUCCESS",
      "Valid user credential",
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
    ).sendResponse(res);

});






export { register, login };
