// Load environment variables
require('dotenv').config()

const app = require('./app')

// Import the database connection handler
const connectdb = require('./database/mongodbController')

const port = process.env.PORT || 4000

// Connect to the database
connectdb()
    .then(() => {
    app.listen(port, function(){
        console.log(`Server listening on port number: ${port}`)
        })
    }).catch((error) => {
        console.error('Database connection failed:', error)
        process.exit(1)
    })