const jwt=require('jsonwebtoken');

const authMiddleware= (req, res, next) => {
    const authHeader = req.headers.authorization; // Get authorization header from the request

    if (!authHeader) {
        // If no token provided, respond with 403 Forbidden
        return res.status(401).json({ message: "Token is required" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    try {
        const secretKey=process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey); // Verify the token with the secret key
        req.user = decoded;
        next();
        
    } catch (error) {
        // If the token is invalid or expired, respond with 401 Unauthorized
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;

