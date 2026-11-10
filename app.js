// Import top level function of express
const express = require('express')

// Application modules
const errorHandler = require('./middleware/errorMiddleware') // Global error handling middleware

// Import routes
const authRouter = require('./router/authRouter')
const userRouter = require('./router/userRouter')

// Create an Express application using the top level function
const app = express()

// Middleware Configuration    
app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use('/api', authRouter)
app.use('/api', userRouter)

// Global error handling middleware
app.use(errorHandler)

// Export the application
module.exports = app

