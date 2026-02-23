import React from "react";
import type { FocusDistribution as FocusDistributionType } from "@/app/lib/api/types";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";

type WhereYouBuildProps = {
    data: FocusDistributionType[];
};

export function WhereYouBuild({ data }: WhereYouBuildProps) {
    const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

    if (data.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Where You Build</h2>
                </div>
                <p className="text-sm text-muted-foreground">No project activity in this range.</p>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold text-foreground">Where You Build</h2>
                <InfoTooltip text="A breakdown of which repositories you spent the most development sessions working on." />
            </div>

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
