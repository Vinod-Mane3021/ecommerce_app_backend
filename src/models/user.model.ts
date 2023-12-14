import mongoose, { Schema } from "mongoose";

import { UserRoles, EmailProvider } from "../constants/enums";
import { NextFunction } from "express";
import bcrypt from "bcrypt";
import HttpStatusCode from "../constants/HttpStatusCodes";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "utils/asyncHandler";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Keys } from "../config/keys";

interface IUser extends Document{
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  password: string,
  avatar: string,
  address: string
  role: string,
  token: string,
  passwordResetToken: string,
  passwordResetExpires: Date,
  isPasswordCorrect: (password: string) => Promise<boolean>
  generatePasswordResetToken: () => Promise<string>
  generateToken: (payload: Object) => Promise<string>
}

// Declare the Schema of the Mongo model
var userSchema = new Schema<IUser>(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: [UserRoles.User, UserRoles.Admin],
      default: UserRoles.User,
    },
    token: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    // cart: [  ]
  },
  {
    timestamps: true,
  }
);

/**
 * scrypt user password before saving into database
 * @param next - next function
 */
userSchema.pre("save", async function (next: NextFunction) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    // hash the password
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error(`Failed to hash password: ${error.message}`);
    // Throw an ApiResponse if password hashing fails
    throw new ApiResponse(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      `Failed to hash password : ${error.message}`
    );
  }
});

/**
 * compare the user request password with encrypted password
 * @param {string} password - user passed from request
 * @returns {Promise<boolean>} - true if request password is equals to encrypted password
 */
userSchema.methods.isPasswordCorrect = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generatePasswordResetToken = async function() {
    try {
        const token = crypto.randomBytes(30).toString("hex");
        this.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
        this.passwordResetExpires = Date.now() + 30 * 60 * 1000;   // 10 minutes
        return token;
    } catch (error) {
        throw new ApiResponse(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "INTERNAL_SERVER_ERROR",
            `Failed to generate password reset token : ${error.message}`
          );
    }
}

userSchema.methods.generateToken = async function(payload: Object) {
  try {
    const token = await jwt.sign(
      payload, 
      Keys.jwt.secret, 
      {//Keys.jwt.tokenLife
        expiresIn: '7d'
      }) 
    return token;
  } catch (error) {
    throw new ApiResponse(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      `Failed to generate jwt token : ${error.message}`
    );
  }
}

export const UserModel = mongoose.model<IUser>("User", userSchema);





