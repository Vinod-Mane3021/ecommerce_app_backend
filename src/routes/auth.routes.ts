import { register } from '../controllers/user.controller'
import { Router } from 'express'


const authRouter = (router: Router) => {
    router.post("/user/register", register)
}

export default authRouter;