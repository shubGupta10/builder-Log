import React from "react";
import type { SessionsOverTime as SessionsOverTimeType } from "@/app/lib/api/types";

type SessionsOverTimeProps = {
    data: SessionsOverTimeType[];
};

export function SessionsOverTime({ data }: SessionsOverTimeProps) {
    const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Sessions Over Time</h2>
                <span className="text-xs text-muted-foreground">Weekly Trend</span>
            </div>

            <div className="flex items-end justify-between gap-2 h-48">
                {data.map((week) => {
                    const heightPercent = (week.sessions / maxSessions) * 100;

                    return (
                        <div key={week.period} className="flex-1 flex flex-col items-center gap-2">
                            {/* Bar */}
                            <div className="w-full flex flex-col justify-end h-40">
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
