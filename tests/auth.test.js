const request = require('supertest');
const app = require('../app');
const User = require('../model/user');

describe(
    'Authentication API Tests', () => {
        describe('POST /api/register', () => {
            test('should register a new user successfully', async () => {
                const userData = {
                    name: 'John Doe',
                    age: 25,
                    email:'johndoe@example.com',
                    password: 'password123'
                }

                const response = await request(app)
                    .post('/api/auth/register')
                    .send(userData)
                
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Registration successful')
                
                // Confirm that the user was saved
                const user = await User.findOne({ email: userData.email })
                expect(user).not.toBeNull()

                // Confirm that the password is hashed
                expect(user.password).not.toBe(userData.password)
            })
        })
})

