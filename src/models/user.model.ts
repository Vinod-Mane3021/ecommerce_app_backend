import mongoose, { Schema } from "mongoose";

import { UserRoles, EmailProvider } from '../constants/enums'

// Declare the Schema of the Mongo model
var userSchema = new Schema(
    {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        email:{ type:String, required:true, unique:true, },        
        mobileNumber:{ type:String, required:true, unique:true, },
        password:{ type:String, required:true, },
        avatar: { type: String },
        address: { type: String },
        
        provider: { type: String, require: true, default: EmailProvider.Email },
        googleId: { type: String },
        facebookId: { type: String },
        role: { 
            type: String, 
            enum: [UserRoles.Member, UserRoles.Merchant, UserRoles.Admin],
            default: UserRoles.Member,
        },
        merchant: { type: Schema.Types.ObjectId, ref: "Merchant", default: null, },
        
        refreshToken: { type: String },
        passwordResetToken: { type: String },
        passwordResetExpires: { type: Date },
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model("User", userSchema);