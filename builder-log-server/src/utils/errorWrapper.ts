import { Response, Request, NextFunction } from "express";

const errorWrapper = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log(error, "error");
            next(error);
        }
    }
}

export { errorWrapper }