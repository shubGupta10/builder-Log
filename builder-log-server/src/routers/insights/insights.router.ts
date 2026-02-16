import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { buildInsights } from "../../modules/insights/insights.controller.js";

const insightsRouter = Router();

insightsRouter.get("/", requireAuth, buildInsights);

export default insightsRouter;