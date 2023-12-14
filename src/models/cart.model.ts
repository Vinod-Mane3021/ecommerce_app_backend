import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
    user: Schema.Types.ObjectId,
    products: [{
        product: Schema.Types.ObjectId,
        quantity: number
    }]
}

const cartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 0,
            },
        }]
    },
    {
        timestamps: true
    }
)

export const cartModel =  mongoose.model<ICart>("Cart", cartSchema);



