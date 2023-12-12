import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
var userSchema = new Schema(
    {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        email:{ type:String, required:true, unique:true, },


        
        mobileNumber:{ type:String, required:true, unique:true, },
        password:{ type:String, required:true, },

        role: { type: String, default: "user" },
        isBlocked: { type: Boolean, default: false },
        cart: { type: Array, default: [] },
        address: { type: String },
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        refreshToken: { type: String },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model("User", userSchema);