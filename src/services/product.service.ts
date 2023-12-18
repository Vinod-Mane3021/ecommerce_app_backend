import { Schema } from "mongoose";
import { ProductModel } from "../models/product.model";

/**
 * Filters products based on a regular expression, pagination parameters.
 * @param {Object} regex - Regular expression object to filter products.
 * @param {number} page - Page number for pagination (starting from 1).
 * @param {number} pageSize - Number of products to return per page.
 * @returns {Promise<Array>} - A promise that resolves to an array of filtered products.
 */
export const filterProducts = (
    regex: Object,
    page: number,
    pageSize: number,
) => {
    return ProductModel
            .find(regex)
            .skip((page-1) * pageSize)
            .limit(pageSize)
}

/**
 * Finds a product by its id
 * @param {Schema.Types.ObjectId} id - The unique identifier of the product.
 * @returns {Promise<null|Object>} - A promise that resolves to the found product or null if not found.
 */
export const findProductById = (id: Schema.Types.ObjectId) => {
    return ProductModel.findById(id);
}
