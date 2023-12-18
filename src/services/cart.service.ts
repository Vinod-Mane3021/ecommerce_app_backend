import { IUser } from "../models/user.model";
import { CartModel, ICart, ICartProducts } from "../models/cart.model";
import { IProduct } from "../models/product.model";
import { Schema } from "mongoose";
import { Types } from "mongoose";

/**
 * Finds cart for a given user by their 
 * @param userId - The unique identifier of the user.
 * @returns A promise resolving to the user cart.
 */
export const findCartItemsByUserId = (userId: Types.ObjectId) => {
    return CartModel.findOne({
        userId: userId
    })
}

/**
 * Creates a new user cart with an empty list of products.
 * @param userId - The unique identifier of the user.
 * @returns A promise resolving to the newly created cart.
 */
export const createNewUserCart = (
    userId: Types.ObjectId, 
) => {
    return CartModel.create({
        userId: userId,
        products: []
    })
}

/**
 * Adds a new product with a specified quantity to the user's cart.
 * @param cart - The user's cart.
 * @param productId - The unique identifier of the product.
 * @param quantity - The quantity of the product to add.
 */
export const addNewProductToCart = (
    cart: ICart, 
    productId: Schema.Types.ObjectId,
    quantity: number
) => {
    // console.log("pushing new product with quantity")
    cart.products.push({
        productId: productId,
        quantity: quantity
    })
}

/**
 * Updates the quantity of a specific product in the user's cart.
 * @param cartProduct - The product in the user's cart.
 * @param quantity - The quantity to add
 */
export const updateProductQuantity = (
    cartProduct: ICartProducts,
    quantity: number
) => {
    cartProduct.quantity += quantity;
}

/**
 * Removes a specified quantity of a product from the user's cart.
 * @param cartProduct - The product in the user's cart.
 * @param quantity - The quantity to remove.
 */
export const removeCartQuantity = (
    cartProduct: ICartProducts,
    quantity: number
) => {
    cartProduct.quantity -= quantity;
}
