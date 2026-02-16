import React from "react";
import type { ActivityMix as ActivityMixType, SessionsOverTime } from "@/app/lib/api/types";

type ActivityMixProps = {
    data: ActivityMixType;
    sessionsOverTime: SessionsOverTime[];
};

export function ActivityMix({ data, sessionsOverTime }: ActivityMixProps) {
    const { commits, pullRequests } = data;

    const totalWeeks = sessionsOverTime.length;
    const commitsPerWeek = Math.floor(commits / totalWeeks);
    const prsPerWeek = Math.floor(pullRequests / totalWeeks);

    // Create weekly data
    const weeklyData = sessionsOverTime.map((week, index) => {
        // Distribute remaining on last week
        const isLastWeek = index === totalWeeks - 1;
        const weekCommits = isLastWeek
            ? commits - (commitsPerWeek * (totalWeeks - 1))
            : commitsPerWeek;
        const weekPRs = isLastWeek
            ? pullRequests - (prsPerWeek * (totalWeeks - 1))
            : prsPerWeek;

        return {
            period: week.period,
            commits: weekCommits,
            pullRequests: weekPRs,
            total: weekCommits + weekPRs
        };
    });

    const maxTotal = Math.max(...weeklyData.map(w => w.total), 1);

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Activity Mix</h2>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">Commits</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                        <span className="text-muted-foreground">PRs</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {weeklyData.map((week) => {
                    const commitsPercent = maxTotal > 0 ? (week.commits / maxTotal) * 100 : 0;
                    const prsPercent = maxTotal > 0 ? (week.pullRequests / maxTotal) * 100 : 0;

                    return (
                        <div key={week.period}>
                            <div className="flex items-center gap-3">
                                <div className="text-xs text-muted-foreground w-12">
                                    Week {week.period.replace('W', '')}
                                </div>
                                <div className="flex-1 flex gap-0.5 h-8 bg-muted rounded-lg overflow-hidden">
                                    {commitsPercent > 0 && (
                                        <div
                                            className="bg-primary transition-all"
                                            style={{ width: `${commitsPercent}%` }}
                                        />
                                    )}
                                    {prsPercent > 0 && (
                                        <div
                                            className="bg-chart-2 transition-all"
                                            style={{ width: `${prsPercent}%` }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

