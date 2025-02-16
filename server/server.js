import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// App config 
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

//allowing request from frontend origins 
const corsOptions = {
    origin: [
      'https://ben-ecommerce-mern-admin.vercel.app',
      'https://ben-ecommerce-mern-frontend.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
    optionsSuccessStatus: 200 
  };

// middlewares 
app.use(express.json())
app.use(cors())
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions)); 


// api endpoints 
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => (
    res.send("Api working")
))

app.listen(port, () => console.log('Server started on PORT: ' + port))
export default app;