import { IUser } from "../models/user.model";
import { CartModel, ICart, ICartProducts } from "../models/cart.model";
import { IProduct } from "../models/product.model";
import { Schema } from "mongoose";
import { Types } from "mongoose";

export const findUserCartItemsByUserId = (userId: Types.ObjectId) => {
    return CartModel.findOne({
        userId: userId
    })
}

export const findCartProductByProductId = (

) => {

}

export const createNewUserCart = (
    userId: Types.ObjectId, 
) => {
    return CartModel.create({
        userId: userId,
        products: []
    })
}

export const addNewProductToCart = (
    cart: ICart, 
    productId: Schema.Types.ObjectId,
    quantity: number
) => {
    console.log("pushing new product with quantity")
    cart.products.push({
        productId: productId,
        quantity: quantity
    })
}

export const updateProductQuantity = (
    cartProduct: ICartProducts,
    quantity: number
) => {
    cartProduct.quantity += quantity
}

export const updateCart = () => {

}