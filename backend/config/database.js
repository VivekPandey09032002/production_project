const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.DB_URI).then( (data) => {
        console.log(`mongodb connected with ${data.connection.host}`)
    })
}

module.exports = connectDB