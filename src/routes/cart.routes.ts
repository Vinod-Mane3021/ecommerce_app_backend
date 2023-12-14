import { Router } from "express";
import { addToCart } from "../controllers/cart.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const cartRouter = Router();

cartRouter.post('/add', authenticate, addToCart)


export default cartRouter;

