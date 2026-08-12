const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        // Check Authorization Header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token is missing."
            });
        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach User Info
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
};

// Role Based Authorization
const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource."
            });

        }

        next();

    };

};

module.exports = {
    authenticate,
    authorize
};