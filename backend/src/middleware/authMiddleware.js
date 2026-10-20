
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // Read the Authorization header
        const authHeader = req.headers.authorization;

        // Check whether token is provided
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. Token is required."
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access denied. Token is required."
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "Server authentication is not configured."
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach authenticated user's information to request
        req.user = decoded;

        // Allow request to continue
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};
