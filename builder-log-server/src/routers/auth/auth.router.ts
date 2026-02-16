import { Router } from "express";
import { handleGithubCallback, logoutUser, startGithubAuth } from "../../modules/auth/auth.controller.js";


const authRouter = Router();

authRouter.get("/github", startGithubAuth);
authRouter.get("/github/callback", handleGithubCallback);
authRouter.post("/logout", logoutUser)

export default authRouter