const mongoose = require('mongoose');  
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Set a test secret for JWT authentication
process.env.JWT_SECRET = 'test-secret-key'

beforeAll(async () => {
    // Start the in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();

    // Connect mongoose to the test database
    await mongoose.connect(mongoUri)
})

afterEach(async() => {
    // Delete all records after every test
    const collections = mongoose.connection.collections;

    for (const key in collections){
        await collections[key].deleteMany({});
    }
})

afterAll(async () => {
    // Close the database connection
    await mongoose.connection.close();

    // Stop the in-memory MongoDB server
    await mongoServer.stop();
})
