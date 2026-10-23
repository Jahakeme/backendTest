// Import Express Router to create modular, mountable route handlers
const {Router} = require('express')
const authRouter = Router()

// Import the authController
const { registerUser, loginUser } = require('../controller/authController')

// REGISTER a new user
authRouter.post('/auth/register', registerUser)

// LOGIN an existing user
authRouter.post('/auth/login', loginUser)

module.exports = authRouter