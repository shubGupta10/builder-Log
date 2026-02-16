import { Router } from "express";
import { getProjects } from "../../modules/projects/projects.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const projectsRouter = Router();

projectsRouter.get("/", requireAuth, getProjects);

export default projectsRouter;
