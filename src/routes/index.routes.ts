import express, { Router } from 'express'
import authRouter from './auth.routes';
import productRouter from './product.routes';

const router = Router()

router.use('/user', authRouter);
router.use('/products', productRouter)


export default router;