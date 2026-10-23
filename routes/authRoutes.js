const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// REGISTER a new user
router.post('/register', async function(request, response) {
    try {
        const { name, age, email, password } = request.body;

        // Check if the user already exists via email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(409).json({
                message: "Email is already registered"
            })
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create a new user
        const user = await User.create({
            name,
            age,
            email,
            password: hashedPassword
        })

        response.status(201).json({
            message: "Registration successful.",
            user
        })
   } catch (error) {
        console.error('Registration error:', error);

        // Handle duplicate emails
        if (error.code === 11000) {
            return response.status(409).json({
                message: 'Email is already registered.'
            });
        }

        // Respond to all other errors
        return response.status(500).json({
            message: 'An error occurred during registration.'
        });
    }
})

// LOGIN an existing user
router.post('/login', async function(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required."
            })
        }

        // Explicitly retrieve the password hash
        const user = await User.findOne({ email }).select('+password')

        // Use the same error for unknown emails and wrong passwords
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return response.status(401).json({
                message: "Invalid email or password."
            })
        }

        // Generate a JWT token containing the user's ID
        const token = jwt.sign(
            {},
            process.env.JWT_SECRET,
            {
                subject: user._id.toString(),
                expiresIn: process.env.JWT_EXPIRES_IN || '1h'
            }
        )

        response.status(200).json({
            message: "Login successful.",
            token,
            user: {
                _id: user._id,
                name: user.name,
                age: user.age,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Login error:', error)

        response.status(500).json({
            message: 'An error occurred during login.'
        })
    }
})

module.exports = router