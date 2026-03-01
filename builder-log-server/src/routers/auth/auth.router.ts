import { Router } from "express";
import { handleGithubCallback, logoutUser, startGithubAuth, startGithubUpgrade } from "../../modules/auth/auth.controller.js";


const authRouter = Router();

authRouter.get("/github", startGithubAuth);
authRouter.get("/github/callback", handleGithubCallback);
authRouter.get("/github/upgrade", startGithubUpgrade);
authRouter.post("/logout", logoutUser)

export default authRouter