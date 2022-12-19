const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../utils/catchAsyncError");
const User = require('../model/userModle');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto")
// register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name,email,password, avatar} = req.body
    // const isvalid = await User.findOne({email})
    // if(isvalid){
    //     return next(new ErrorHandler("email already exists",400))
    // }
    const user = await User.create({name,email,password,avatar})

    sendToken(user,201,res)

});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }

    const user = await User.findOne({email : email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invaild criendtials",400))
    }

    const isPasswordMatched =  await  user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invaild email or password",400))
    }

    sendToken(user,200,res)
});


//logout user
exports.logOutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })

});

//forgot password mail send
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    //get reset password token
    const resetToken = user.getResetPasswordToken()
    //need to save the changes in db
    await user.save({validateBeforeSave : false});

    //link for mail
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} if you have not requested this email then please ignore it`

    try{
        await sendEmail({
            email : user.email,
            subject : `E-commerce password recovery`,
            message,
        })
        res.status(200).json({
            success : true,
            message : `email sent to ${user.email}`
        })
    }catch(err){
        user.resetPasswordToken  = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave : false});  
        return next(new ErrorHandler(err.message,500))   
    }
});


//reset the password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    // find hash token in db

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("reset password token is invalid or has been expired",400))   
    }

    if(req.body.password.length >= 8 && req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("password doesn't match",400))          
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    sendToken(user,200,res)
});


//get user detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    //always 
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user
    })
});

//change password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
    //always 
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched =  await  user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect",400))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doens't match",400))        
    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(user,200,res)

});


//update user profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    if(!req.body.name || !req.body.email){
        return next(new ErrorHandler("All fields required to update",400))
    }
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }
    // add later avatar

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators : true
    });

    res.status(200).json({
        success : true,
    })

});

//get all users (admin wants to see)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find()

    res.status(200).json({
        success : true,
        users
    })

});

//get single user (admin want to see)
//get all users
exports.getSingleUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById({_id : req.params.id})
    if(!user){
        return next(new ErrorHandler(`User doesn't exist ${req.params.id}`),400)
    }

    res.status(200).json({
        success : true,
        user
    })

});


// update user detail by admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.role){
       return next(new ErrorHandler("All fields required to update",400))
    }
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }
    // add later avatar

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new : true,
        runValidators : true
    });
    await user.save()
    res.status(200).json({
        success : true,
    })

});

// delete user detail by admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    //we will remove cloud later
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user doesn't exist with ${req.params.id}`,400))
    }
    await user.remove();
    res.status(200).json({
        success : true,
        message : "user delete successfully"
    })

});
