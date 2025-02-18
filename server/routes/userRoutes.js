import express from 'express'
import { loginUser, registerUser, adminLogin, adminRegister, fetchUserDetails } from '../controllers/userController.js'
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/admin-register', adminRegister)
userRouter.post('/profile', authUser, fetchUserDetails)


export default userRouter;