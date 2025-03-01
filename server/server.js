import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import functionRouter from './routes/functionRoutes.js'

// App config 
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

//allowing request from frontend origins 
const corsOptions = {
  origin: [
    'https://ben-ecommerce-mern-admin.vercel.app',
    'https://ben-ecommerce-mern-frontend.vercel.app',
    'http://localhost:5174',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true,
};
//cors middleware
app.use(cors(corsOptions));

// Manually Handle Preflight Requests this is for when i am using vercel
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// middlewares 
app.use(express.json())
app.use(cors())

// Handle preflight requests
app.options('*', cors(corsOptions));


// api endpoints 
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/function', functionRouter)

app.get('/', (req, res) => (
  res.send("Api working")
))

app.listen(port, () => console.log('Server started on PORT: ' + port))
export default app;