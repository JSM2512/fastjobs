const express  = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const xlsx = require('xlsx')
const bodyParser = require('body-parser')
const path = require('path')





connectDB()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/api/pet', require('./routes/petRoutes.js'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))



