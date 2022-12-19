const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require('jsonwebtoken')
const User = require('../model/userModle')
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const {token} = req.cookies;
  if(!token){
    return next(new ErrorHandler("Please Login to access this resource",401))
  }
  const decodedData = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById({_id : decodedData.id})
  next()
});

exports.authorizeRoles = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
        next( new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resourece`,400) )
    }
    next()
  }
}
