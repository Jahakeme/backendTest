const mongoose = require('mongoose')

const connect_database = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        return console.error(error)
    }
}

module.exports = connect_database