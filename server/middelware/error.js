const ErrorHandler = require('../utility/errorHandler');



module.exports = (err,req,res,nxt)=>{
    err.statusCode = err.statusCode || 500
    err.massage = err.massage || "internal Server Error"


    if(err.name === "CastError"){
        const massage = `Resorce not found. Invalid:${err.path}`
        err = new ErrorHandler(massage,400)
    }

    res.status(err.statusCode).json({
        success:false,
        massage:err,
    })
}