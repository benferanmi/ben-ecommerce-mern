import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe"
import https from "https"


//global varaibles 
const currency = 'ngn'
const deliveryCharge = 10

//gateway initialise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing order using COD method

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "OrderPlaced" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

// placing order using stripe method
const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verifyStripe?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verifyStripe?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//verify Stripe 

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//placing order using paystach 
const placeOrderPaystack = async (req, res) => {

    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Paystack",
        payment: false,
        date: Date.now()
    }
    const convertedAmount = amount * 100
    const newOrder = new orderModel(orderData);
    await newOrder.save()


    const params = JSON.stringify({
        "email": address.email,
        "first_name": address.firstName,
        "last_name": address.lastName,
        "amount": convertedAmount,
        "currency": "NGN",
        "callback_url": `${origin}/verifypaystack?orderId=${newOrder._id}`
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY} `,
            'Content-Type': 'application/json'
        }
    }

    const paystackRequest = https.request(options, paystackResponse => {
        let data = ''

        paystackResponse.on('data', (chunk) => {
            data += chunk
        });

        paystackResponse.on('end', () => {
            const payData = JSON.parse(data)

            res.json({ success: true, payData })

        })
    }).on('error', error => {
        console.error(error)
        res.json({ success: false, message: error.message })
    })

    paystackRequest.write(params)
    paystackRequest.end()
}

//verify the payment from 
const verifyPaystackPayment = async (req, res) => {

    const { orderId, reference, userId } = req.body

    const options = {
        hostname: 'api.paystack.co',
        timeout: 10000,
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`
        }
    }

    // Create the request
    const request = https.request(options, (paystackResponse) => {
        let data = '';

        paystackResponse.on('data', (chunk) => {
            data += chunk;
        });

        paystackResponse.on('end', async () => {
            if (paystackResponse.statusCode === 200) {
                const parseData = JSON.parse(data)

                try {
                    await orderModel.findByIdAndUpdate(orderId, { payment: true })
                    await userModel.findByIdAndUpdate(userId, { cartData: {} })
                    res.json({ success: true })
                } catch (error) {
                    console.error('Database update error:', error);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            } else {
                try {
                    await orderModel.findByIdAndDelete(orderId)
                    console.error('Failed to verify payment:', data);

                    res.status(paystackResponse.statusCode).json({ success: false, message: 'Payment verification failed', data });
                } catch (error) {

                }
            }
        });
    });

    request.on('error', (error) => {
        console.error('Error occurred during payment verification:', error);
        res.status(500).json({ message: 'Error occurred during payment verification', error: error.message });
    });

    request.end();

}

// placing order using razorpay method
const placeOrderRazorPay = async (req, res) => {

}

//All orders data for Admin Panel 
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// user order data for frontend 
const userOrder = async (req, res) => {
    try {

        const { userId } = req.body;

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//update order status from admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "Status Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, userOrder, updateStatus, verifyStripe, placeOrderPaystack, verifyPaystackPayment }