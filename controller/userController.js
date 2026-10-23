const mongoose = require('mongoose');
const User = require('../model/user');
const authenticate = require('../middleware/authMiddleware');

const getaSingleUserById = async (request, response) => {
    try{
        // Users can only access their record
        if (request.user.id !== request.params.id) {
            return response.status(403).json({
                message: "You cannot access this user."
            })
        }

        if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
            return response.status(400).json({
                message: "Invalid user ID."
            })
        }

        const user = await User.findById(request.params.id)

        if (!user) {
            return response.status(404).json({
                message: "User not found."
            })
        }

        response.status(200).json(user)
    } catch (error) {
        console.error('Get user error:', error)

        response.status(500).json({
            message: 'An error occurred while retrieving the user.'
        })
    }
}

module.exports = getaSingleUserById