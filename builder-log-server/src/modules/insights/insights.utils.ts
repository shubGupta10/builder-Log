import { TimelineDay } from "../timeline/timeline.interface.js";

export const generateConsitencyStrip = async (timeline: TimelineDay[], from: string, to: string) => {
    // Convert ISO DateTime to date-only format
    const fromDate = from.split('T')[0]!;
    const toDate = to.split('T')[0]!;

    // Step 1: Create a Map for quick lookup of active days
    const activeMap = new Map<string, boolean>();
    for (const day of timeline) {
        if (day.sessions.length >= 1) {
            activeMap.set(day.date, true)
        }
    }

    //generate all day in range
    const allDays: { date: string; hasActivity: boolean }[] = [];
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split("T")[0]!;

        allDays.push({
            date: dateStr,
            hasActivity: activeMap.has(dateStr)
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    //calculate activeDays
    const activeDays = allDays.filter(day => day.hasActivity).length;

    //calculate current streak from to backward
    let curentStreak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
        if (allDays[i]?.hasActivity) {
            curentStreak++;
        } else {
            break;
        }
    }

    //calculate last active streak (most recent streak before current inactivity)
    let lastActiveStreak = 0;
    if (curentStreak === 0) {
        // Find the most recent active day and count backwards
        let foundActive = false;
        let streakCount = 0;

        for (let i = allDays.length - 1; i >= 0; i--) {
            if (allDays[i]?.hasActivity) {
                foundActive = true;
                streakCount++;
            } else if (foundActive) {
                // We've found the end of the last active streak
                break;
            }
        }

        lastActiveStreak = streakCount;
    } else {
        // If there's a current streak, last active streak is the same
        lastActiveStreak = curentStreak;
    }

    return {
        activeDays,
        curentStreak,
        lastActiveStreak,
        activityByDay: allDays
    }
}

const getISOWeek = (dateString: string): number => {
    const date = new Date(dateString);

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);

    // Get first day of year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

    return weekNo;
};

export const generateSessionsOverTime = async (timeline: TimelineDay[], from: string, to: string) => {
    // Convert ISO DateTime to date-only format
    const fromDate = from.split('T')[0]!;
    const toDate = to.split('T')[0]!;

    const weeklyMap = new Map<number, number>();
    for (const day of timeline) {
        const weekNumber = getISOWeek(day.date);
        const sessionCount = day.sessions.length;

        if (weeklyMap.has(weekNumber)) {
            weeklyMap.set(weekNumber, weeklyMap.get(weekNumber)! + sessionCount);
        } else {
            weeklyMap.set(weekNumber, sessionCount);
        }
    }

    //get week range
    const startWeek = getISOWeek(fromDate);
    const endWeek = getISOWeek(toDate);

    const allWeek: { period: string; sessions: number }[] = [];
    for (let week = startWeek; week <= endWeek; week++) {
        const sessionCount = weeklyMap.get(week) || 0;
        const weekLabel = `W${week - startWeek + 1}`; // Normalize to W1, W2, W3...

        allWeek.push({
            period: weekLabel,
            sessions: sessionCount
        });
    }
    return allWeek;
};

export const generateActivityMix = async (timeline: TimelineDay[]) => {
    let commits = 0;
    let pullRequests = 0;

    // Loop through all sessions and count event types
    for (const day of timeline) {
        for (const session of day.sessions) {
            for (const event of session.events) {
                if (event.type === "commit") {
                    commits++;
                } else if (event.type === "pull_request") {
                    pullRequests++;
                }
            }
        }
    }

    return {
        commits,
        pullRequests
    };
};

export const generateFocusDistribution = async (timeline: TimelineDay[]) => {
    // Step 1: Create a Map to count sessions per repo
    const repoMap = new Map<string, { repoOwner: string; repoName: string; sessions: number }>();

    for (const day of timeline) {
        for (const session of day.sessions) {
            const key = `${session.repoOwner}/${session.repoName}`;

            if (repoMap.has(key)) {
                repoMap.get(key)!.sessions++;
            } else {
                repoMap.set(key, {
                    repoOwner: session.repoOwner,
                    repoName: session.repoName,
                    sessions: 1
                });
            }
        }
    }

    // Step 2: Convert Map to array and sort by session count (descending)
    const sortedRepos = Array.from(repoMap.values()).sort((a, b) => b.sessions - a.sessions);

    // Step 3: Take top 5
    return sortedRepos.slice(0, 5);
};

export const generateMomentum = async (timeline: TimelineDay[], from: string, to: string) => {
    // Convert ISO DateTime to date-only format
    const fromDate = from.split('T')[0]!;
    const toDate = to.split('T')[0]!;

    // Step 1: Calculate total sessions and total days
    let totalSessions = 0;
    for (const day of timeline) {
        totalSessions += day.sessions.length;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Step 2: Calculate average sessions per day (gentle rounding for better UX)
    let avgSessionsPerDay = 0;
    if (totalDays > 0) {
        const rawAvg = totalSessions / totalDays;
        // Gentle rounding: if < 1, round to 1 decimal with slight upward bias
        if (rawAvg < 1) {
            avgSessionsPerDay = Math.ceil(rawAvg * 10) / 10;
        } else {
            avgSessionsPerDay = parseFloat(rawAvg.toFixed(1));
        }
    }

    // Step 3: Split timeline into two halves and count sessions
    const midDate = new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2);

    let firstHalfSessions = 0;
    let secondHalfSessions = 0;

    for (const day of timeline) {
        const dayDate = new Date(day.date);
        const sessionCount = day.sessions.length;

        if (dayDate < midDate) {
            firstHalfSessions += sessionCount;
        } else {
            secondHalfSessions += sessionCount;
        }
    }

    // Step 4: Determine trend
    let trend: "up" | "down" | "flat";
    const difference = Math.abs(secondHalfSessions - firstHalfSessions);
    const threshold = totalSessions * 0.1; // 10% threshold for "flat"

    if (difference <= threshold) {
        trend = "flat";
    } else if (secondHalfSessions > firstHalfSessions) {
        trend = "up";
    } else {
        trend = "down";
    }

    return {
        trend,
        avgSessionsPerDay
    };
};