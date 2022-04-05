const express = require('express');
const app = express()
const errorMiddelware = require('./middelware/error')
const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')


app.use(express.json())
app.use('/api/v1',productRouter)
app.use('/api/v1',userRouter)


// mddelware for error
app.use(errorMiddelware)


module.exports = app