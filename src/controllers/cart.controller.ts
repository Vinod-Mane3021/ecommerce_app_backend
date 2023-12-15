import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "../middlewares/auth.middlewares";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";
import { findProductById } from "../services/product.service";
import { addNewProductToCart, createNewUserCart, findUserCartItemsByUserId, updateProductQuantity } from "../services/cart.service";
import { Schema } from "mongoose";

export const addToCart = asyncHandler(
    async (req: authRequest, res: Response, next: NextFunction) => {
        const userId = req.userId;
        const { quantity } = req.body;
        const productId = req.body.productId

        console.log(`userid :`, userId)
        console.log("quantity: ", quantity)
        console.log("producId : ", productId)

        if(!userId || !productId || !quantity || quantity < 1) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "all felid must required").sendResponse(res);
        }
        const product = await findProductById(productId);
        if(!product) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "invalid product id").sendResponse(res);
        }

        let cart = await findUserCartItemsByUserId(userId);

        console.log("CART : ", cart)
        
        if(!cart) {
            cart = await createNewUserCart(userId)
            console.log("createUserCart")
        }

        const cartProduct = cart.products.find(product => product.productId == productId)

        console.log("cartProduct : ", cartProduct)

        if(!cartProduct) {
            console.log("addNewProductToCart")
            addNewProductToCart(cart, productId, 1)
        } else {
            console.log("updateProductQuantity")
            updateProductQuantity(cartProduct, 1);
        }

        const addedCart = await cart.save()

        if(!cart) {
            return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "Product not added to cart").sendResponse(res);
        }

        return new ApiResponse(HttpStatusCode.OK, "SUCCESS", "Product added to cart successfully", addedCart).sendResponse(res)
    }
)
