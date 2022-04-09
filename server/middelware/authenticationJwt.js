const ErrorHandler = require("../utility/errorHandler")
const User = require('../modles/usersModel')
const jwt = require('jsonwebtoken')

exports.authenticationJWT =async(req,res,nxt)=>{
    const {token} = req.cookies

    if(!token){
        return nxt(new ErrorHandler("there is no token Please Login First",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRETKEY)

    req.user =await  User.findById(decodedData.id)
    
    nxt()
}

exports.role = (...role)=>{
    
    return (req,res,nxt)=>{
        if(!role.includes(req.user.role)){
            return nxt( new ErrorHandler(`role:${req.user.role} is not allwoed to acess this Resource`))
        }
        nxt()
    }
}
