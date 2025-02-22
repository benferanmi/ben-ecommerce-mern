import express from 'express'
import { allOrders, placeOrder, placeOrderRazorPay, placeOrderStripe, updateStatus, placeOrderPaystack, userOrder, verifyStripe, verifyPaystackPayment } from '../controllers/orderController.js'
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
orderRouter.post('/paystack', authUser, placeOrderPaystack)


//user Features
orderRouter.post('/userorders', authUser, userOrder)

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyPaystack', authUser, verifyPaystackPayment)


export default orderRouter;