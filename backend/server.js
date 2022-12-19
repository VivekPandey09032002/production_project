const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

//config
dotenv.config({path : "backend/config/config.env"})

//uncaught exception handling
process.on("uncaughtException",(err)=> {
    console.log(`Error : ${err.message}`)
    console.log('shuting down server due to uncaught exception')
    process.exit(1)
})

//connect Database
connectDB()

const server = app.listen(process.env.PORT, ()=> {
    console.log(`server is up ${process.env.PORT}`)
})


// Unhandled promise rejection
process.on('unhandledRejection',(err)=> {
    console.log(`Error : ${err.message}`)
    console.log('shuting down server due to unhandled promise rejection')
    server.close(()=>{
        process.exit(1)
    })
})