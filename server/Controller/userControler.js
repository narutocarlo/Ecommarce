const ErrorHandler = require('../utility/errorHandler')
const theCatchHandler = require('../middelware/catchError')
const User = require('../modles/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('../utility/sendEmail')

//jwt token function
const getJwtToken = (payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRETKEY,{expiresIn:process.env.JWT_EXPIRE})
}



// fuction for reset password
const getResetPasswordToken = (user)=>{
    // genrate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // hashing and adding resetTokenPassword to userschema
    user.reserPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex') 
    user.reserPasswordExpire= Date.now() +15*60*1000

    return resetToken
}



// Register a User
exports.registerUser= async(req,res,nxt)=>{
    const {email} = req.body

    const isEmailAlreayExists = await User.find({email})
    
    if(!!isEmailAlreayExists[0]){
        return nxt(new ErrorHandler("it seems like email has been already regitered",404))
    }
    const user = await User.create( req.body);
    
    const token = getJwtToken({id:user.id})

    res.status(200).cookie('token',token).json({
        succsses:true,
        massage:"user registered successfully",
        token,
    })
}



//login 
exports.loginUser = async(req,res,nxt)=>{
    const {email,password} = req.body
    
    // checking if user has given email and password both
    if(!email || !password){
        return nxt(new ErrorHandler("Pleasse Enter the Email And Password",404))
    }
    const user = await User.find({email}).select("+password")

    
    
    if(!user[0]){
        return nxt(new ErrorHandler("this user is not Registered check your Details",404))
    }
    
    const isPasswordMatched = await  bcrypt.compare(password,user[0].password)
    // console.log(isPasswordMatched);
    if (!isPasswordMatched){
        return nxt(new ErrorHandler("Invalid email or password"),404) 
    }
    
    const token = getJwtToken({id:user[0].id})
    
    res.status(200).cookie('token',token).json({
        succsses:true,
        massage:"user LogedIn successfully",
        token,
        user
    })
}


//logout
exports.logOutUser = async(req,res,nxt)=>{


res.status(200).clearCookie('token').json({
        succsses:true,
        massage:"Logged Out"
    })
}


//forgot Password
exports.forgotPassword = async(req,res,nxt)=>{

    const user = await User.find({email:req.body.email})

    if(!user){
        return nxt(new ErrorHandler("user not found",404))
    }
    const resetToken = getResetPasswordToken(user)

    await user.save({ValidateBeforSave:false})

    const resetPasswordTokenUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const massage = `Your  password Reset Token is :- \n\n ${resetPasswordTokenUrl} \n\n if you have not requested this email then please ignore it`;


    try {

        await sendEmail({
            email:user.email,
            subject:"Eccomerce password reset",
            massage
        })

        res.status(200).json({
            succsses:true,
            massage:`Email Sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.reserPasswordToken = undefined
        user.reserPasswordExpire = undefined
        await user.save({ValidateBeforSave:false})

        return nxt(new ErrorHandler(error.massage,500))
    }



}

