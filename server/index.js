const express = require('express')
const connectMongoo = require('./config/dataBase')
const dotenv = require('dotenv')
const app = require('./app')

// cofig
dotenv.config({path:'./config/.env'})

connectMongoo()







app.listen(process.env.PORT,()=>console.log("server started"))
// process.on('unhandledRejection',err=>{
//     console.log(`Error:${err.massage}`);
//     console.log("Shuting Down the Server Due to Unhandeled Promise Rejection");
//     app.listen(process.env.PORT,()=>console.log("server started")).close(()=>{
//         process.exist(1)
//     })
// })
