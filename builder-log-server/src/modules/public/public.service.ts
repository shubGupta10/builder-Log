import redis from "../../lib/redis.js";
import { timelineService } from "../timeline/timeline.service.js";
import { InsightsService } from "../insights/insights.service.js";
import { projectsService } from "../projects/projects.service.js";
import { generateContributions } from "../contributions/contributions.utils.js";
import { User } from "../user/user.model.js";
import {
    PublicProfileResponse,
    ProfileSection,
    SummarySection,
    ConsistencyStripSection,
    ProjectItem,
    ActivityItem,
    MetaSection,
    ContributionsSection,
} from "./public.interface.js";

const getPublicProfile = async (username: string): Promise<PublicProfileResponse> => {
    const cacheKey = `public-profile:${username}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
        return cached as PublicProfileResponse;
    }

    //  Find user by username
    const user = await User.findOne({
        githubUsername: username,
    });

    if (!user) {
        throw new Error("User not found");
    }

    //  Check if builder profile is enabled
    if (!user.isBuilderProfile) {
        throw new Error("Builder profile not public");
    }

    // Calculate date range (last 30 days)
    const currentDate = new Date();
    const fromDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Format dates as ISO strings for API consistency
    const from = fromDate.toISOString();
    const to = currentDate.toISOString();

    // Fetch timeline data
    const timeline = await timelineService.buildTimeline(user._id.toString(), from, to);

    // Fetch insights data (includes consistency, streaks, momentum)
    const insights = await InsightsService.buildInsights(user._id.toString(), from, to);

    // Fetch projects data
    const projectsData = await projectsService.buildProjects(user._id.toString(), from, to);

    // Build Profile section
    const profile: ProfileSection = {
        username: user.githubUsername,
        displayName: user.displayName || null,
        avatarUrl: user.githubAvatarUrl || "",
        bio: user.bio || null,
        githubUrl: user.githubProfileUrl || `https://github.com/${user.githubUsername}`,
        joinedAt: user.createdAt,
    };

    // Build Summary section
    const summary: SummarySection = {
        activeDays: insights.consistency.activeDays,
        currentStreak: insights.consistency.currentStreak,
        lastActiveStreak: insights.consistency.lastActiveStreak,
        totalProjects: projectsData.summary.totalProjects,
        momentum: insights.momentum.trend === "flat" ? "stable" : insights.momentum.trend,
    };

    // Build Consistency Strip section
    const consistencyStrip: ConsistencyStripSection = {
        range: {
            from: from.split("T")[0]!,
            to: to.split("T")[0]!,
        },
        activityByDay: insights.consistency.activityByDay,
    };

    //  Build Projects section (top 10 most recent)
    const projects: ProjectItem[] = projectsData.projects.slice(0, 10).map((p: any) => ({
        repoOwner: p.repoOwner,
        repoName: p.repoName,
        status: p.status,
        sessionCount: p.sessionCount,
        lastActivityAt: p.lastActivityAt,
    }));

    // Build Recent Activity section (last 20 events)
    const recentActivity: ActivityItem[] = [];

    // Extract events from timeline days (most recent first)
    for (const day of timeline) {
        for (const session of day.sessions) {
            for (const event of session.events) {
                if (recentActivity.length >= 20) break;

                recentActivity.push({
                    type: event.type,
                    repoOwner: session.repoOwner,
                    repoName: session.repoName,
                    occurredAt: event.occurredAt,
                });
            }
            if (recentActivity.length >= 20) break;
        }
        if (recentActivity.length >= 20) break;
    }

    // Sort by most recent first
    recentActivity.sort(
        (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    );

    // Build Contributions section
    const contributionsData = generateContributions(timeline, user.githubUsername);
    const contributions: ContributionsSection = {
        summary: contributionsData.summary,
        ownProjects: contributionsData.ownProjects.slice(0, 10),
        externalRepos: contributionsData.openSource.slice(0, 10),
        totalExternalContributions: contributionsData.summary.externalCommits + contributionsData.summary.externalPRs,
    };

    const meta: MetaSection = {
        generatedAt: new Date().toISOString(),
        dataRangeDays: 30,
    };

    const response: PublicProfileResponse = {
        success: true,
        data: {
            profile,
            summary,
            consistencyStrip,
            projects,
            recentActivity,
            contributions,
            meta,
        },
    };

    await redis.set(cacheKey, JSON.stringify(response), { ex: 3600 });

    return response;
};

export const publicService = {
    getPublicProfile,
};