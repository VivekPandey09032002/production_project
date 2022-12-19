module.exports = (myFun) => {
    return (req,res,next) => {
        return Promise.resolve(myFun(req,res,next)).catch(next)
    }
}