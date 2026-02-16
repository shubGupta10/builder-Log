import redis from "../../lib/redis.js";
import { timelineService } from "../timeline/timeline.service.js"
import { generateConsitencyStrip, generateSessionsOverTime, generateActivityMix, generateFocusDistribution, generateMomentum } from "./insights.utils.js";

const buildInsights = async (userId: string, from: string, to: string) => {
    const cacheKey = `insights:${userId}:${from}:${to}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
        return cached as any;
    }

    const timeline = await timelineService.buildTimeline(userId, from, to);

    //generate consistency strip
    const consistency = await generateConsitencyStrip(timeline, from, to);

    //generate sessions over time
    const sessionsOverTime = await generateSessionsOverTime(timeline, from, to);

    //generate activity mix
    const activityMix = await generateActivityMix(timeline);

    //generate focus distribution
    const focusDistribution = await generateFocusDistribution(timeline);

    //generate momentum
    const momentum = await generateMomentum(timeline, from, to);

    // Calculate total days (convert ISO DateTime to date-only)
    const fromDate = from.split('T')[0]!;
    const toDate = to.split('T')[0]!;
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const results = {
        range: {
            from,
            to,
            totalDays
        },
        consistency: {
            activeDays: consistency.activeDays,
            currentStreak: consistency.curentStreak,
            lastActiveStreak: consistency.lastActiveStreak,
            activityByDay: consistency.activityByDay
        },
        sessionsOverTime,
        activityMix,
        focusDistribution,
        momentum
    }

    //cache for 4800
    await redis.set(cacheKey, JSON.stringify(results), { ex: 4800 })
    return results;
}

export const InsightsService = {
    buildInsights
}