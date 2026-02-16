export type InsightsResponse = {
    range: {
        from: string;
        to: string;
        totalDays: number;
    };

    consistency: {
        activeDays: number;
        currentStreak: number;
        lastActiveStreak: number;
        activityByDay: {
            date: string;       // YYYY-MM-DD
            hasActivity: boolean;
        }[];
    };

    sessionsOverTime: {
        period: string;      // e.g. "W1", "W2" or ISO week
        sessions: number;
    }[];

    activityMix: {
        commits: number;
        pullRequests: number;
    };

    focusDistribution: {
        repoOwner: string;
        repoName: string;
        sessions: number;
    }[];

    momentum: {
        trend: "up" | "down" | "flat";
        avgSessionsPerDay: number;
    };
};
