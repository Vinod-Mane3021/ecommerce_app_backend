import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "../middlewares/auth.middlewares";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";
import { findProductById } from "../services/product.service";
import { addNewProductToCart, createNewUserCart, findCartItemsByUserId, removeCartQuantity, updateProductQuantity } from "../services/cart.service";
import { Schema } from "mongoose";

/**
 * Controller to add cart based on user
 */
export const addToCart = asyncHandler(
    /**
     * @param req - request from client containing quantity, productId
     * @param res - sending response to client
     * @returns  - Response with SUCCESS status or ERROR
     */
    async (req: authRequest, res: Response) => {
        // extracting properties from request
        const userId = req.userId;
        const { quantity, productId } = req.body;

        // console.log(`userid :`, userId)
        // console.log("quantity: ", quantity)
        // console.log("producId : ", productId)

        // validating properties
        if(!userId || !productId || !quantity || quantity < 1) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "all felid must required").sendResponse(res);
        }
        // finding product from database
        const product = await findProductById(productId);
        // validating product
        if(!product) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "invalid product id").sendResponse(res);
        }

        // defining cart variable
        let cart;
        // finding existing cart by userId and updating cart variable
        cart = await findCartItemsByUserId(userId);

        // console.log("CART : ", cart)
        
        /**
         * If cart not exist for userId
         * create a new cart for userId and updating cart variable
         */
        if(!cart) {
            cart = await createNewUserCart(userId)
            // console.log("createUserCart")
        }

        // finding the product from cart by productId and storing in cartProduct variable
        const cartProduct = cart.products.find(product => product.productId == productId)

        // console.log("cartProduct : ", cartProduct)

        /**
         * If the product in cart not found, create a product and add into the cart
         * else is the product already exist in cart just update the quantity
         */
        if(!cartProduct) {
            // console.log("addNewProductToCart")
            addNewProductToCart(cart, productId, 1)
        } else {
            // console.log("updateProductQuantity")
            updateProductQuantity(cartProduct, 1);
        }
        // saving cart in database
        const savedCart = await cart.save()
        // If cart not saved in database return and send response with status 'INTERNAL_SERVER_ERROR'
        if(!savedCart) {
            return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "Product not added to cart").sendResponse(res);
        }

        // return and send response with status 'SUCCESS' if the product added cart successfully
        return new ApiResponse(HttpStatusCode.OK, "SUCCESS", "Product added to cart successfully").sendResponse(res)
    }
)

/**
 * Controller to remove product from cart
 */

export const removeFromCart = asyncHandler(
    /**
     * @param req - request from client containing quantity, productId
     * @param res - sending response to client
     * @returns  - Response with SUCCESS status or ERROR
     */
    async (req: authRequest, res: Response) => {
        // extracting from auth middleware
        const userId = req.userId;
        // extracting from req
        const { quantity, productId } = req.body
        // finding product from database by productId
        const product = await findProductById(productId);
        // validating product
        if(!product) {
            return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "product not found").sendResponse(res)
        }
        // finding cart by userId
        const cart = await findCartItemsByUserId(userId);
        // validating cart
        if(!cart) {
            return new ApiResponse(HttpStatusCode.BAD_REQUEST, "BAD_REQUEST", "cart not found").sendResponse(res);
        }

        // finding product from cart
        const cartProduct = cart.products.find(product => product.productId == productId);

        // validating cart product
        if(!cartProduct) {
            return new ApiResponse(HttpStatusCode.NOT_FOUND, "NOT_FOUND", "product not found in cart").sendResponse(res);
        }

        /**
         * checking if the cart product quantity is less then 2
         * if yes, removing that product from cart
         */
        if(cartProduct.quantity  < 2) {
            cart.products.filter(product => product.productId != productId)
        }
        
        // decreasing the cart quantity from cart
        await removeCartQuantity(cartProduct, quantity);

        // saving cart
        const savedCart = cart.save();

        // validating saved cart
        if(!savedCart) {
            return new ApiResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "Product not added to cart").sendResponse(res);
        }

        // returning and sending 'SUCCESS' response when product is successfully remove from cart
        return new ApiResponse(HttpStatusCode.OK, "SUCCESS", "Product removed to cart successfully").sendResponse(res)
    }
)