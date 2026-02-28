import React from "react";
import type { SessionsOverTime, Momentum as MomentumType } from "@/app/lib/api/types";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";

type BuildPulseProps = {
    sessionsOverTime: SessionsOverTime[];
    momentum: MomentumType;
};

export function BuildPulse({ sessionsOverTime, momentum }: BuildPulseProps) {
    const { trend, avgSessionsPerDay } = momentum;
    const totalSessions = sessionsOverTime.reduce((sum, w) => sum + w.sessions, 0);
    const maxSessions = Math.max(...sessionsOverTime.map((d) => d.sessions), 1);

    const getTrendIcon = () => {
        switch (trend) {
            case "up":
                return (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                );
            case "down":
                return (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                );
            case "flat":
                return (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border/50">
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                        </svg>
                    </div>
                );
        }
    };

    const getTrendColor = () => {
        switch (trend) {
            case "up": return "text-green-500";
            case "down": return "text-red-500";
            case "flat": return "text-muted-foreground";
        }
    };

    const getTrendMessage = () => {
        switch (trend) {
            case "up":
                return "You're building more than before — momentum is real.";
            case "down":
                return "Activity slowed down. Time to carve out a deep work block.";
            case "flat":
                return "Steady rhythm. Consistency wins over bursts.";
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold text-foreground">Build Pulse</h2>
                <InfoTooltip text="Your coding velocity — how intensely and consistently you've been shipping." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left: Stats */}
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {getTrendIcon()}
                            <span className={`text-sm font-semibold capitalize ${getTrendColor()}`}>
                                {trend === "up" ? "Accelerating" : trend === "down" ? "Cooling Off" : "Steady"}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {getTrendMessage()}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <div>
                            <div className="text-3xl font-bold text-foreground">{totalSessions}</div>
                            <div className="text-xs text-muted-foreground">Total Sessions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-foreground">{avgSessionsPerDay}</div>
                            <div className="text-xs text-muted-foreground">Avg / Day</div>
                        </div>
                    </div>
                </div>

                {/* Right: Compact bar chart */}
                <div className="flex items-end gap-1 h-28">
                    {sessionsOverTime.map((week, i) => {
                        const heightPercent = Math.max((week.sessions / maxSessions) * 100, 2);
                        return (
                            <div key={week.period} className="flex-1 flex flex-col items-center justify-end h-full">
                                <div
                                    className={`w-full rounded-sm shadow-sm transition-all hover:brightness-125 cursor-pointer ${week.sessions > 0 ? "bg-primary shadow-[0_0_12px_rgba(var(--primary),0.5)]" : "bg-muted"
                                        }`}
                                    style={{ height: `${heightPercent}%` }}
                                    title={`${week.sessions} sessions`}
                                />
                                {/* Show label for first, middle, last */}
                                {(i === 0 || i === sessionsOverTime.length - 1) && (
                                    <span className="text-[9px] text-muted-foreground mt-1 whitespace-nowrap">
                                        {week.period}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
