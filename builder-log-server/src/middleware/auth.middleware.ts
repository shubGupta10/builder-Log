import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.cookies.auth_token;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { userId } = verifyToken(token);
        req.user = { id: userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}