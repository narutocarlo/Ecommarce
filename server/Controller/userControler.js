const ErrorHandler = require('../utility/errorHandler')
const theCatchHandler = require('../middelware/catchError')
const User = require('../modles/usersModel')
const jwt = require('jsonwebtoken')

// Register a User

exports.registerUser= theCatchHandler(async(req,res)=>{
    // const {name,email,password} = req.body

    const user = await User.create( req.body);

    const token = user.getJWTToken()
    
    res.status(200).json({
        succsses:true,
        massage:"user registered successfully",
        token,
    })
})




exports.loginUser = async(req,res,nxt)=>{
    const {email,password} = req.body
    
    // checking if user has given email and password both
    if(!email || !password){
        return nxt(new ErrorHandler("Pleasse Enter the Email And Password",404))
    }
    const user = await User.find({email}).select("+password")
    console.log(user[0].password);
    if(!user){
        return nxt(new ErrorHandler("this user is not Registered check your Details",404))
    }
    
    const isPasswordMatched =  user.comparPassword(password)
    console.log(isPasswordMatched);
    if (!isPasswordMatched){
        return nxt(new ErrorHandler("Invalid email or password"),404) 
    }
    const token = user.getJWTToken()
    
    res.status(200).json({
        succsses:true,
        massage:"user LogedIn successfully",
        token,
    })
}