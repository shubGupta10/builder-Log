import { Router } from "express";
import { getContributions } from "../../modules/contributions/contributions.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const contributionsRouter = Router();

contributionsRouter.get("/", requireAuth, getContributions);

export default contributionsRouter;
