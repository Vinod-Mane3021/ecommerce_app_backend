import { getProduct, getProducts } from "../controllers/product.controller";
import { Router } from 'express'

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct)

export default productRouter;




