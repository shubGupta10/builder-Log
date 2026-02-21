import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth/auth.router.js";
import userRouter from "./routers/user/user.router.js";
import connectDB from "./lib/db.js";
import cors from "cors"
import timelineRouter from "./routers/timeline/timeline.router.js";
import insightsRouter from "./routers/insights/insights.router.js";
import projectsRouter from "./routers/projects/projects.router.js";
import settingsRouter from "./routers/settings/settings.router.js";
import publicRouter from "./routers/public/public.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

connectDB();

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/timeline", timelineRouter);
app.use("/insights", insightsRouter);
app.use("/projects", projectsRouter);
app.use("/settings", settingsRouter);
app.use("/public", publicRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
