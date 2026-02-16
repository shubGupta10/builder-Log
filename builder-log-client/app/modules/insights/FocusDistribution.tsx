import React from "react";
import type { FocusDistribution as FocusDistributionType } from "@/app/lib/api/types";

type FocusDistributionProps = {
    data: FocusDistributionType[];
};

export function FocusDistribution({ data }: FocusDistributionProps) {
    const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Focus Distribution</h2>

            <div className="space-y-4">
                {data.map((repo) => {
                    const widthPercent = (repo.sessions / maxSessions) * 100;

                    return (
                        <div key={`${repo.repoOwner}/${repo.repoName}`}>
                            <div className="flex items-center justify-between mb-2 text-sm">
                                <span className="text-foreground font-medium">
                                    {repo.repoOwner}/{repo.repoName}
                                </span>
                                <span className="text-muted-foreground">{repo.sessions} sessions</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${widthPercent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
