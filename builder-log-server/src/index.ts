import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRouter from "./routers/auth/auth.router.js";
import userRouter from "./routers/user/user.router.js";
import connectDB from "./lib/db.js";
import cors from "cors"
import timelineRouter from "./routers/timeline/timeline.router.js";
import insightsRouter from "./routers/insights/insights.router.js";
import projectsRouter from "./routers/projects/projects.router.js";
import settingsRouter from "./routers/settings/settings.router.js";
import publicRouter from "./routers/public/public.router.js";
import contributionsRouter from "./routers/contributions/contributions.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

// Body size limit — prevent large payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

// Global rate limiter — 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

// Stricter limiter for auth routes — 10 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later." },
});

app.use(globalLimiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

connectDB();

app.use("/user", userRouter);
app.use("/auth", authLimiter, authRouter);
app.use("/timeline", timelineRouter);
app.use("/insights", insightsRouter);
app.use("/projects", projectsRouter);
app.use("/settings", settingsRouter);
app.use("/public", publicRouter);
app.use("/contributions", contributionsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
