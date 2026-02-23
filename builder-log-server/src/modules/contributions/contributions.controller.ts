import { Request, Response } from "express";
import { errorWrapper } from "../../utils/errorWrapper.js";
import { contributionsService } from "./contributions.service.js";

const getContributions = errorWrapper(
    async (req: Request, res: Response) => {
        const { from, to } = req.query;

        if (!from || !to || typeof from !== "string" || typeof to !== "string") {
            return res.status(400).json({ message: "Missing 'from' and 'to' query parameters" });
        }

        const userId = req.user!.id;
        const fromISO = new Date(from).toISOString();
        const toISO = new Date(to).toISOString();
        const data = await contributionsService.buildContributions(userId, fromISO, toISO);

        return res.status(200).json({
            message: "Contributions fetched successfully",
            data,
        });
    }
);

export { getContributions };
