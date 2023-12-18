import { Router } from "express";
import { addToCart, removeFromCart } from "../controllers/cart.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const cartRouter = Router();

cartRouter.post('/add', authenticate, addToCart)
cartRouter.post('/remove', authenticate, removeFromCart)

export default cartRouter;

