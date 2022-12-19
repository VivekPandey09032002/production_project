const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    //cast error in mongodg
    if(err.name === "CastError"){
        const msg = `Resource not found ${err.path}`
        err = new ErrorHandler(msg,400)
    }

    if(err.code === 11000){
        const msg = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(msg,400)
    }
    //JWT Token  ERROR
    if(err.name === "JsonWebTokenError"){
        const msg = `Json web token is invalid, try again`
        err = new ErrorHandler(msg,400)        
    }
    //JWT expire error
    if(err.name === "TokenExpiredError"){
        const msg = `Json web token is invalid, try again`
        err = new ErrorHandler(msg,400)        
    }    
    return  res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}