class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        // this.check = "hello checking"
        Error.captureStackTrace(this,this.constructor)
    }
}
//this class's object will be send to error handling middleware as parameter 

module.exports = ErrorHandler