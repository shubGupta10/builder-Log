import { errorWrapper } from "../../utils/errorWrapper.js";
import { projectsService } from "./projects.service.js";
import { Request, Response } from "express";

const getProjects = errorWrapper(
    async (req: Request, res: Response) => {
        const userId = req.user!.id;

        let from: string;
        let to: string;

        if (typeof req.query.from === "string") {
            const fromDate = new Date(req.query.from);
            fromDate.setHours(0, 0, 0, 0); // Start of day
            from = fromDate.toISOString();
        } else {
            const fromDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
            fromDate.setHours(0, 0, 0, 0); // Start of day
            from = fromDate.toISOString();
        }

        if (typeof req.query.to === "string") {
            const toDate = new Date(req.query.to);
            toDate.setHours(23, 59, 59, 999); // End of day
            to = toDate.toISOString();
        } else {
            const toDate = new Date();
            toDate.setHours(23, 59, 59, 999); // End of day
            to = toDate.toISOString();
        }

        const data = await projectsService.buildProjects(
            userId,
            from,
            to
        );

        res.status(200).json({
            message: "Projects fetched successfully",
            data,
        });;
    }
);


export {
    getProjects
}