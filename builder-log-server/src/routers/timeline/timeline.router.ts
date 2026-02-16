import { Router } from "express";
import { buildTimeline } from "../../modules/timeline/timeline.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const timelineRouter = Router();

timelineRouter.get("/", requireAuth, buildTimeline);

export default timelineRouter;