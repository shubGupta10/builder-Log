import { Request, Response } from "express";
import { errorWrapper } from "../../utils/errorWrapper.js";
import { InsightsService } from "./insights.service.js";

const buildInsights = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        let from: string;
        let to: string;

        if (typeof req.query.from === "string") {
            from = new Date(req.query.from).toISOString();
        } else {
            from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString();
        }

        if (typeof req.query.to === "string") {
            to = new Date(req.query.to).toISOString();
        } else {
            to = new Date().toISOString();
        }

        const insights = await InsightsService.buildInsights(userId, from, to);

        return res.status(200).json({
            success: true,
            message: "Insights built successfully",
            data: insights
        });
    }
);

export {
    buildInsights
};