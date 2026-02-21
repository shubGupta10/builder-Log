import { Request, Response } from "express";
import { errorWrapper } from "../../utils/errorWrapper.js";
import { publicService } from "./public.service.js";

const getPublicProfile = errorWrapper(
    async (req: Request, res: Response) => {
        const { username } = req.params;
        
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ message: "Valid username is required" });
        }

        const profileData = await publicService.getPublicProfile(username);

        return res.status(200).json(profileData);
    }
)

export {
    getPublicProfile
}