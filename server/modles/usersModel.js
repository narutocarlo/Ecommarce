const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')




const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"],
        maxlength:[30,"name should not be exceed 30 letters"],
        minlength:[4,"name should be more 4 letter"]
    },
    email:{
        type:String,
        required:[true,"please enter the email"],
        validate:[validator.isEmail,"please Enter a valid Email"]

    },
    password:{
        type:String,
        required:[true,"please enter the name"],
        minlength:[6,"Password should be more  6 letter"],
        select:false
    },
    avatar:
        {
            public_Id:{
            type:String
        },
        url:{
            type:String
        }
    },
    role:{
        type:String,
        default:"user"
    },
    reserPasswordToken:String,
    reserPasswordExpire:Date,

    
})

UserSchema.pre('save', async function (nxt){
    
    if(!this.isModified("password")){
        nxt()
    }
    this.password =await bcrypt.hash(this.password,10)
    
})





module.exports= mongoose.model('User',UserSchema)