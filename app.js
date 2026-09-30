// Import top level function of express
const express = require('express')
const mongoose = require('mongoose')

// Import the User model
const User = require('./models/user')

// Create an Express application using the top level function
const app = express()

// Load environment variables from .env file
require('dotenv').config()

// Define port number
const port = 4000

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error)
    })

// Middleware Configuration    
app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));

/* USER MODEL ROUTES */
// POST Route
app.post('/users', async function(request, response){
    const user = await User.create({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email
    })
    response.status(201).json(user)
})

// GET Route
app.get('/users/:id', async function(request, response){
    const user = await User.findById(request.params.id)
    if (!user) {
        return response.status(404).json({
            message: 'User not found'
        })
    }
    response.status(200).json(user)
})

// UPDATE route
app.patch("/users/:id", async function(request, response){
    const user = await User.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true } // Return the updated document
    )
    if (!user) {
        return response.status(404).json({
            message: 'User not found'
        })
    }
    response.status(200).json(user)
})

// DELETE Route
app.delete("/users/:id", async function(request, response){
    const user = await User.findByIdAndDelete(request.params.id)
    if (!user) {
        return response.status(404).json({
            message: 'User not found'
        })
    }
    response.status(200).json({
        message: 'User deleted successfully'
    })
})


// Make the app listen on port 4000
app.listen(port, function(){
    console.log(`Server listening on port number: ${port}`)
})

