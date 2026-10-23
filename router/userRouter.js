const {Router} = require('express')
const userRouter = Router()

// Import userController
const getaSingleUserById = require('../controller/userController')

// Import authentication middleware
const authenticate = require('../middleware/authMiddleware')

// Apply the authentication middleware to all routes in this router
userRouter.use(authenticate)

// GET a user by ID
userRouter.get('/users/:id', getaSingleUserById)

module.exports = userRouter;
