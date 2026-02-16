import { Router } from "express";
import { getGithubStatus, resyncGithub, disconnectUser } from "../../modules/settings/settings.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const settingsRouter = Router();

settingsRouter.get("/github-status", requireAuth, getGithubStatus);
settingsRouter.get("/resyncGithub", requireAuth, resyncGithub);
settingsRouter.get("/disconnectUser", requireAuth, disconnectUser);

export default settingsRouter