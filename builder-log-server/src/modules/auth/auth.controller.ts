import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { errorWrapper } from "../../utils/errorWrapper.js";
import { signToken } from "../../utils/jwt.js";

const handleGithubCallback = errorWrapper(
    async (req: Request, res: Response) => {
        const { code } = req.query;

        if (!code || typeof code !== "string") {
            return res.status(400).json({ message: "Missing code" });
        }

        const { accessToken, githubUser, user } = await authService.handleGithubCallback(code);

        const token = signToken(user._id.toString());

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        })

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        return res.redirect(`${frontendUrl}/timeline`);
    }
)

const startGithubAuth = errorWrapper(
    async (req: Request, res: Response) => {
        const redirectUrl = authService.startGithubAuth();
        return res.redirect(redirectUrl);
    }
)

const logoutUser = errorWrapper(
    async (req: Request, res: Response) => {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })

        return res.status(200).json({
            message: "Logged out successfully"
        })
    }
)

export {
    handleGithubCallback,
    startGithubAuth,
    logoutUser
}