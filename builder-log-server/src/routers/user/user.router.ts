import { Router } from "express";
import { getMe } from "../../modules/user/user.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getMe);

export default userRouter;