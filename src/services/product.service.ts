import { Schema } from "mongoose";
import { ProductModel } from "../models/product.model";

const filterProducts = (
    regex: Object,
    page: number,
    pageSize: number,
) => {
    return ProductModel
            .find(regex)
            .skip((page-1) * pageSize)
            .limit(pageSize)
}

const findProductById = (id: Schema.Types.ObjectId) => {
    return ProductModel.findById(id);
}

export { filterProducts, findProductById }