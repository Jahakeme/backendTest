const jwt = require('jsonwebtoken');

function authenticate(request, response, next) {
    // Get the Authorisation header
    const authHeader = request.headers.authorization;

    // Expect: Authorization: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    // No token means the user is not authenticated
    if (!token) {
        return response.status(401).json({
            message: "Authentication required. Log in."
        })
    }

    // Verify the token using our JWT Secret
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return response.status(401).json({
                message: "Invalid or expired token."
            })
        }

        // Attach the authenticated user's ID to the request
        request.user = {
            id: decoded.sub
        }

        // Proceed to the next middleware or route handler
        next();
    })
}

module.exports = authenticate