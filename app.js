// Import top level function of express
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Application modules
const connectdb = require('./database/mongodbController') // Database connection handler
const errorHandler = require('./middleware/errorMiddleware') // Global error handling middleware

// Import routes
const authRouter = require('./router/authRouter')
const userRouter = require('./router/userRouter')

// Create an Express application using the top level function
const app = express()
const port = process.env.PORT || 4000

// Initialize database connection
connectdb()

// Middleware Configuration    
app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use('/api', authRouter)
app.use('/api', userRouter)

// Global error handling middleware
app.use(errorHandler)

// Make the app listen on port 4000
app.listen(port, function(){
    console.log(`Server listening on port number: ${port}`)
})
