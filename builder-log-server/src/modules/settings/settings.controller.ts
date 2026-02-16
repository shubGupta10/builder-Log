import { Request, Response } from "express";
import { errorWrapper } from "../../utils/errorWrapper.js";
import { settingsService } from "./settings.service.js";

const getGithubStatus = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;

        if (!userId) {
            throw new Error("User not authenticated");
        }

        const stats = await settingsService.getGithubStatus(userId);

        return res.status(200).json({
            stats
        })
    }
)

const resyncGithub = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;

        if (!userId) {
            throw new Error("User not authenticated");
        }

        await settingsService.resyncGithub(userId);

        return res.status(200).json({
            message: "Github Resync successfully",
            success: true
        })
    }
)

const disconnectUser = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;

        if (!userId) {
            throw new Error("User not authenticated");
        }

        await settingsService.disconnectUser(userId);

        return res.status(200).json({
            message: "Github Disconnected successfully",
            success: true
        })
    }
)

export {
    getGithubStatus,
    resyncGithub,
    disconnectUser
}