import express, { Router } from 'express'
import authRouter from './auth.routes';

const router = Router();

const mainRouter = () => {
    authRouter(router);
    return router;
}

export default mainRouter;