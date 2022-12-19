const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const cors = require('cors');
const errorMiddleware = require('./middleware/error')

app.use(cors({
    origin : ["http://192.168.1.5:5173", "http://localhost:5173"],
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

//routes imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require("./routes/orderRoute")
//product route
app.use('/api/v1',order)
app.use('/api/v1',product)
app.use('/api/v1',user)

//home page route connect client

if(process.env.NODE_ENV=='production'){
   
}
const path = require('path')
app.get('/',(req,res) => {
    app.use(express.static(path.join(__dirname,'..','frontend','dist')))
    res.sendFile(path.resolve(__dirname,'..','frontend','dist','index.html'))
})

//middleware for error -> last middleware
app.use(errorMiddleware)

module.exports = app

