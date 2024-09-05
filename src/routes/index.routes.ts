import express, { Router } from 'express'
import authRouter from './auth.routes';
import productRouter from './product.routes';
import cartRouter from './cart.routes';

const router = Router()

router.use('/user', authRouter);
router.use('/product', productRouter)
router.use('/cart', cartRouter)


export default router;