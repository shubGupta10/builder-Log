import { errorWrapper } from "../../utils/errorWrapper.js";
import { timelineService } from "./timeline.service.js";
import { Request, Response } from "express";

const buildTimeline = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user!.id;

        let from: string;
        let to: string;

        if (typeof req.query.from === "string") {
            const fromDate = new Date(req.query.from);
            from = fromDate.toISOString();
        } else {
            from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString();
        }

        if (typeof req.query.to === "string") {
            const toDate = new Date(req.query.to);
            to = toDate.toISOString();
        } else {
            to = new Date().toISOString();
        }

        const timeline = await timelineService.buildTimeline(
            userId,
            from,
            to
        );

        res.status(200).json({
            message: "Timeline built successfully",
            timeline,
        });
    }
);


export {
    buildTimeline
}