const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})

const connectingMongoos=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongoDB Connected"))
    
}

module.exports =connectingMongoos