import mongoose, { Schema } from "mongoose";

interface IProduct extends Document {
    product_url: string,
    product_name: string,
    product_category_tree: string[],
    retail_price: number,
    discounted_price: number,
    image: string[],
    description: string,
    brand: string,
}

const productSchema = new Schema(
    {
        product_url: String,
        product_name: String,
        product_category_tree: [{ type: String }],
        retail_price: Number,
        discounted_price: Number,
        image: [{ type: String }],
        description: String,
        brand: String
    },
    {
        timestamps: true
    }
)

export const ProductModel = mongoose.model<IProduct>("Product", productSchema)