// Import top level function of express
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

// Create an Express application using the top level function
const app = express()
const port = process.env.PORT || 4000

// Middleware Configuration    
app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error)
    })

// Make the app listen on port 4000
app.listen(port, function(){
    console.log(`Server listening on port number: ${port}`)
})
