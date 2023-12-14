import { login, register } from '../controllers/auth.controller'
import { Router } from 'express'

const authRouter = Router();

authRouter.post('/register', register)
authRouter.get('/login', login)





export default authRouter;