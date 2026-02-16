import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.auth_token;

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