import mongoose, { Schema } from "mongoose";

import { MerchantStatus } from "../constants/enums";

const merchantSchema = new Schema(
    {
        name: { type: String, trim: true, },
        email: { type: String, },
        phoneNumber: { type: String, },
        brandName: { type: String, },
        business: { type: String, trim: true, },
        isActive: { type: Boolean, default: false, },
        brand: { type: Schema.Types.ObjectId, ref: "Brand", default: null, },
        status: {
            type: String,
            enum: [ MerchantStatus.WaitingApproval, MerchantStatus.Approved, MerchantStatus.Rejected ],
            default: MerchantStatus.WaitingApproval
        },
    },
    {
        timestamps: true,
    }
);

export const MerchantModel = mongoose.model("Merchant", merchantSchema);
