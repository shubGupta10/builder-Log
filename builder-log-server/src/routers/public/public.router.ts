import { Router } from "express";
import { getPublicProfile } from "../../modules/public/public.controller.js";

const publicRouter = Router();

publicRouter.get("/:username", getPublicProfile);

export default publicRouter;
