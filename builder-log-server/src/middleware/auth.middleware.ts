import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

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