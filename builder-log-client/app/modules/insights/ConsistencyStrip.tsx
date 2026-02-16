import React from "react";
import type { Consistency } from "@/app/lib/api/types";

type ConsistencyStripProps = {
    consistency: Consistency;
};

export function ConsistencyStrip({ consistency }: ConsistencyStripProps) {
    const { activityByDay, activeDays, currentStreak, lastActiveStreak } = consistency;

    // Group days by weeks for better visual organization
    const totalDays = activityByDay.length;
    const daysPerRow = Math.ceil(totalDays / 1); // Single row for now

    // Get date labels (first, middle, last)
    const getDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const firstDate = activityByDay[0]?.date;
    const midDate = activityByDay[Math.floor(totalDays / 2)]?.date;
    const lastDate = activityByDay[totalDays - 1]?.date;

    return (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Consistency Strip</h2>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-muted"></div>
                        <span className="text-muted-foreground">Inactive</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-primary"></div>
                        <span className="text-muted-foreground">Active</span>
                    </div>
                </div>
            </div>

            {/* Activity strip */}
            <div className="mb-3">
                <div className="flex gap-1 mb-2">
                    {activityByDay.map((day, index) => (
                        <div
                            key={day.date}
                            className={`flex-1 h-12 rounded-sm transition-colors ${day.hasActivity ? "bg-primary" : "bg-muted"
                                }`}
                            title={`${day.date}: ${day.hasActivity ? "Active" : "Inactive"}`}
                        />
                    ))}
                </div>

                {/* Date labels */}
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>{firstDate && getDateLabel(firstDate)}</span>
                    <span>{midDate && getDateLabel(midDate)}</span>
                    <span>{lastDate && getDateLabel(lastDate)}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-border">
                <div>
                    <div className="text-2xl font-bold text-foreground">{activeDays}</div>
                    <div className="text-xs text-muted-foreground">Active Days</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-foreground">
                        {currentStreak > 0 ? currentStreak : lastActiveStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {currentStreak > 0 ? "Current Streak" : "Last Streak"}
                    </div>
                </div>
            </div>
        </div>
    );
}
