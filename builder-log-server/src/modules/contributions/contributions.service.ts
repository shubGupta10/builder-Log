import redis from "../../lib/redis.js";
import { timelineService } from "../timeline/timeline.service.js";
import { generateContributions } from "./contributions.utils.js";
import { User } from "../user/user.model.js";
import { GithubAuth } from "../auth/githubAuth.model.js";

const buildContributions = async (userId: string, from: string, to: string) => {
    const cacheKey = `contributions:${userId}:${from}:${to}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
        return cached as any;
    }

    // Get the user's GitHub username
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const timeline = await timelineService.buildTimeline(userId, from, to);
    const contributions = generateContributions(timeline, user.githubUsername);

    const result = {
        range: { from, to },
        ...contributions,
    };

    await redis.set(cacheKey, JSON.stringify(result), { ex: 4800 });
    return result;
};

export const contributionsService = {
    buildContributions,
};
