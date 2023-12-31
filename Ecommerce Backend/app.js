import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import db from './config/dbConnect.js'
import bodyParser from 'body-parser'


// import all routes
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import blogRoute from './routes/blogRoute.js'
import prodCategoryRoute from './routes/prodCategoryRoute.js'
import blogCategoryRoute from './routes/blogCategoryRoute.js'
import brandRoute from './routes/brandRoute.js'
import couponRoute from './routes/couponRoute.js'
import cartRoute from './routes/cartRoute.js'

import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware/errorHandler.js'

let app = express()
dotenv.config()
let PORT = process.env.PORT || 3113

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// app logs in app.log file
app.use(morgan('dev', { stream: fs.createWriteStream('./app.log') }))

app.use('/api/user', authRoute)
app.use('/api/product', productRoute)
app.use('/api/blog', blogRoute)
app.use('/api/product-category', prodCategoryRoute)
app.use('/api/blog-category', blogCategoryRoute)
app.use('/api/brand', brandRoute)
app.use('/api/coupon', couponRoute)
// app.use('/api/cart', cartRoute)
app.use(notFound)
app.use(errorHandler)

app.get('/health', (req, res) => {
    res.status(200).send("<h1>Health is OK</h1>")
})

app.listen(PORT, (err) => {
    console.log(`Port ${PORT} is running`)
})