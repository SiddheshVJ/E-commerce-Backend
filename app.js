import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import fs from 'fs'
import db from './config/dbConnect.js'
import bodyParser from 'body-parser'
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware/errorHandler.js'

let app = express()
dotenv.config()
let PORT = process.env.PORT || 3113

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// app logs
app.use(morgan('dev', { stream: fs.createWriteStream('./app.log') }))


app.use('/api/user', authRoute)
app.use('/api/product', productRoute)
app.use(notFound)
app.use(errorHandler)

app.get('/health', (req, res) => {
    res.status(200).send("<h1>Health is OK</h1>")
})

app.listen(PORT, (err) => {
    console.log(`Port ${PORT} is running`)
})