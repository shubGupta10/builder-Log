import mongoose from "mongoose";
import { githubGraphQL } from "../../integrations/github/github.graphql.js";
import { githubREST } from "../../integrations/github/github.rest.js";
import { GithubAuth } from "../auth/githubAuth.model.js";
import { TimelineDay, TimelineSession, SESSION_GAP_MINUTES } from "./timeline.interface.js";
import { getCntributionLimits } from "./timeline.utils.js";
import redis from "../../lib/redis.js";

const buildTimeline = async (userId: string, from: string, to: string): Promise<TimelineDay[]> => {
    const cacheKey = `timeline:${userId}:${from}:${to}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
        return cached as TimelineDay[];
    }

    const githubAuth = await GithubAuth.findOne({
        userId: new mongoose.Types.ObjectId(userId)
    });

    if (!githubAuth) {
        throw new Error("Github not connected");
    }

    const accessToken = githubAuth.accessToken;

    const { commitLimit, prLimit } = getCntributionLimits(from, to);

    const events = await githubGraphQL.fetchContributionEvents(
        accessToken,
        from,
        to,
        { commitLimit, prLimit }
    );

    let finalTimeline: TimelineDay[] = [];

    // 4. Process events if any exist
    if (events.length > 0) {
        const sortedEvents = [...events].sort((a, b) =>
            new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
        );

        const sessions = groupIntoSessions(sortedEvents);

        const enrichmentPromises = sessions.map(async (session) => {
            await enrichSession(session, accessToken);
            session.summary = generateSummary(session);
        })

        await Promise.all(enrichmentPromises)

        finalTimeline = groupSessionsByDay(sessions);
    }

    await redis.set(cacheKey, JSON.stringify(finalTimeline), { ex: 4800 });

    return finalTimeline;
}

const groupIntoSessions = (events: any[]): TimelineSession[] => {
    const sessions: TimelineSession[] = [];

    let currentSession: TimelineSession | null = null;

    for (const event of events) {
        if (!currentSession) {
            currentSession = {
                repoOwner: event.repoOwner,
                repoName: event.repoName,
                startTime: event.occurredAt,
                endTime: event.occurredAt,
                events: [event],
                summary: "",
            };
            continue;
        }

        const lastEventTime = new Date(currentSession.endTime).getTime();
        const currentEventTime = new Date(event.occurredAt).getTime();

        const diffMinutes = (lastEventTime - currentEventTime) / 60000;

        const sameRepo =
            currentSession.repoOwner === event.repoOwner &&
            currentSession.repoName === event.repoName;

        if (diffMinutes <= SESSION_GAP_MINUTES && sameRepo) {
            currentSession.endTime = event.occurredAt;
            currentSession.events.push(event);
        } else {
            sessions.push(currentSession);
            currentSession = {
                repoOwner: event.repoOwner,
                repoName: event.repoName,
                startTime: event.occurredAt,
                endTime: event.occurredAt,
                events: [event],
                summary: "",
            };
        }
    }

    if (currentSession) {
        sessions.push(currentSession);
    }

    for (const session of sessions) {
        const temp = session.startTime;
        session.startTime = session.endTime;
        session.endTime = temp;
    }

    return sessions;
};

const enrichSession = async (
    session: TimelineSession,
    accessToken: string
): Promise<void> => {
    const cacheKey = `commits:${session.repoOwner}:${session.repoName}:${session.startTime}:${session.endTime}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
        (session as any).commitCount = cached as number;
        return;
    }
    try {
        const commits = await githubREST.fetchCommits(
            accessToken,
            session.repoOwner,
            session.repoName,
            session.startTime,
            session.endTime
        );

        (session as any).commitCount = commits.length;
        await redis.set(cacheKey, commits.length.toString(), { ex: 86400 });
    } catch (error) {
        (session as any).commitCount = 0;
    }
};

const generateSummary = (session: TimelineSession): string => {
    const commitCount = (session as any).commitCount ?? 0;
    const prCount = session.events.filter((e) => e.type === "pull_request").length;
    const commitEventCount = session.events.filter((e) => e.type === "commit").length;

    if (prCount > 1) {
        return `Reviewed and worked on ${prCount} pull requests`;
    }
    if (prCount === 1) {
        return `Worked on a pull request`;
    }

    if (commitCount >= 10) {
        return `Major development session (${commitCount} commits)`;
    }

    if (commitCount >= 5) {
        return `Feature development (${commitCount} commits)`;
    }

    if (commitCount >= 2) {
        return `Code updates (${commitCount} commits)`;
    }

    if (commitCount === 1) {
        return `Small fix or update`;
    }

    if (commitEventCount > 0) {
        return `Code activity in ${session.repoName}`;
    }

    return `Repository activity`;
};

const groupSessionsByDay = (sessions: TimelineSession[]): TimelineDay[] => {
    const dayMap = new Map<string, TimelineSession[]>();

    for (const session of sessions) {
        const day = session.startTime.split("T")[0] as string;

        if (!dayMap.has(day)) {
            dayMap.set(day, []);
        }

        dayMap.get(day)!.push(session);
    }

    return Array.from(dayMap.entries()).map(([date, sessions]) => ({
        date,
        sessions,
    }));
};

export const timelineService = {
    buildTimeline
};