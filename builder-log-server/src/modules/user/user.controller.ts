import { Request, Response } from "express";
import { errorWrapper } from "../../utils/errorWrapper.js";
import { userService } from "./user.service.js";

const getMe = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user!.id;

        const user = await userService.getMe(userId);

        return res.status(200).json({
            message: "User fetched successfully",
            user
        })
    }
)

export {
    getMe
}