import mongoose, { Schema, Document } from "mongoose";

export interface ICartProducts {
    productId: Schema.Types.ObjectId,
    quantity: number
}
export interface    ICart extends Document {
    userId: Schema.Types.ObjectId,
    products: [ICartProducts]
}

const cartSchema = new Schema<ICart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        products: [{
            productId: {
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




export const CartModel =  mongoose.model<ICart>("Cart", cartSchema);



