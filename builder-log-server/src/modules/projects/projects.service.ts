import redis from "../../lib/redis.js";
import { timelineService } from "../timeline/timeline.service.js"
import { Project } from "./projects.type.js";

const buildProjects = async (userId: string, from: string, to: string) => {
    const cacheKey = `projects:${userId}:${from}:${to}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
        return cached as any;
    }

    const timeline = await timelineService.buildTimeline(userId, from, to);

    const allSession = timeline.flatMap(day => day.sessions);

    if (allSession.length === 0) {
        return {
            range: { from, to },
            summary: {
                totalProjects: 0,
                active: 0,
                stalled: 0,
                shipped: 0
            },
            projects: []
        }
    }

    //group session by repo
    const repoMap = new Map<string, {
        repoOwner: string;
        repoName: string;
        sessionCount: number;
        lastActivityAt: string
    }>();

    for (const session of allSession) {
        const key = `${session.repoOwner}/${session.repoName}`;

        if (!repoMap.has(key)) {
            repoMap.set(key, {
                repoOwner: session.repoOwner,
                repoName: session.repoName,
                sessionCount: 0,
                lastActivityAt: session.endTime
            })
        }

        const project = repoMap.get(key)!;
        project.sessionCount += 1;
        if (new Date(session.endTime) > new Date(project.lastActivityAt)) {
            project.lastActivityAt = session.endTime;
        }
    }
    // 4. Determine project status
    const projects: Project[] = [];
    const now = new Date(to);
    let activeCount = 0;
    let stalledCount = 0;
    let shippedCount = 0;
    for (const data of repoMap.values()) {
        const lastActivity = new Date(data.lastActivityAt);
        const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let status: "active" | "stalled" | "shipped" = "stalled";
        if (diffDays <= 7) {
            status = "active";
            activeCount++;
        } else {
            status = "stalled";
            stalledCount++;
        }
        projects.push({
            repoOwner: data.repoOwner,
            repoName: data.repoName,
            status,
            sessionCount: data.sessionCount,
            lastActivityAt: data.lastActivityAt
        });
    }
    // 5. Sort projects by lastActivityAt desc
    projects.sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime());

    const result = {
        range: {
            from,
            to
        },
        summary: {
            totalProjects: projects.length,
            active: activeCount,
            stalled: stalledCount,
            shipped: shippedCount
        },
        projects
    };

    await redis.set(cacheKey, JSON.stringify(result), { ex: 4800 })
    return result;
};


export const projectsService = {
    buildProjects
};