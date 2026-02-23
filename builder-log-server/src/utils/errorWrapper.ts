import { Response, Request, NextFunction } from "express";

const errorWrapper = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            console.error(`[ERROR] ${req.method} ${req.path}:`, error.message);
            next(error);
        }
    }
}

export { errorWrapper }