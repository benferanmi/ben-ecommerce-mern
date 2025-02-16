import express from 'express'
import { allOrders, placeOrder, placeOrderRazorPay, placeOrderStripe, updateStatus, userOrder, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/AdminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()


//Admin Features 
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorPay)
orderRouter.post('/stripe', authUser, placeOrderStripe)


//user Features
orderRouter.post('/userorders', authUser, userOrder)

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)


export default orderRouter;