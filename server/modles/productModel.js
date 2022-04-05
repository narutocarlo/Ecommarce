const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter Product Name"],
        trim:true
    },
    discription:{
        type:String,
        required:[true,"please Enter Product Discription"]
    },
    price:{
        type:Number,
        required:[true,"please Enter Product Price"],
        maxLength:[6,"Price can not exceed 6"],
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {public_Id:{
            type:String
        },
        url:{
            type:String
        }}
    ],
    category:{
        type:String,
        require:[true,"please Enter Product category"],
    },
    stock:{
        type:Number,
        require:[true,"please Enter product stock"],
        maxLength:[4,"stock can not exceed 4 digit"],
        
    },
    numOfReviews:{
        type:Number,
        default:0,
    },

    reviews:[{
        name:{
            typeof:String,
                    
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,

        }

    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})


module.exports = mongoose.model("Product",productSchema)