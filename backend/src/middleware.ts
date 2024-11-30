import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

// @ts-ignore
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            message: "Authorization header is missing"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 && parts[0] !== "Bearer") {
        return res.status(400).json({
            message: "Invalid authorization format"
        })
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
        req.userId = decoded.id;
        next();
    } catch (e) {
        return res.status(400).json({
            message: "Invalid or expired token"
        })
    }
}

