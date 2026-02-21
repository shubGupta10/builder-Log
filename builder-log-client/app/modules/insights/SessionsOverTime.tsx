import React from "react";
import type { SessionsOverTime as SessionsOverTimeType } from "@/app/lib/api/types";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";

type SessionsOverTimeProps = {
    data: SessionsOverTimeType[];
};

export function SessionsOverTime({ data }: SessionsOverTimeProps) {
    const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Sessions Over Time</h2>
                    <InfoTooltip text="The total volume of coding sessions you've completed each week." />
                </div>
                <span className="text-xs text-muted-foreground">Weekly Trend</span>
            </div>

            <div className="flex items-end justify-between gap-2 h-48">
                {data.map((week) => {
                    const heightPercent = (week.sessions / maxSessions) * 100;

                    return (
                        <div key={week.period} className="flex-1 flex flex-col items-center gap-2">
                            {/* Bar & Label container */}
                            <div className="w-full flex flex-col justify-end items-center h-40">
                                {week.sessions > 0 && (
                                    <span className="text-[10px] font-medium text-muted-foreground mb-1">
                                        {week.sessions}
                                    </span>
                                )}
                                <div
                                    className="w-full bg-primary rounded-t transition-all"
                                    style={{ height: `${heightPercent}%` }}
                                    title={`${week.period}: ${week.sessions} sessions`}
                                />
                            </div>

                            {/* Label */}
                            <div className="text-xs text-muted-foreground">{week.period}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
