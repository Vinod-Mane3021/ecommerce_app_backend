import { getProduct } from "../controllers/product.controller";
import { Router } from 'express'

const productRouter = Router();

productRouter.get("/", getProduct);

export default productRouter;
