class ErrorHandler extends Error{
    constructor(massage,statusCode){
        super(massage);
        this.statusCode=statusCode
        this.massage = massage

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = ErrorHandler