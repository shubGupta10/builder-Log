import React from "react";
import type { Consistency } from "@/app/lib/api/types";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";

type ConsistencyStripProps = {
    consistency: Consistency;
};

const DAYS_PER_ROW = 30;

function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

export function ConsistencyStrip({ consistency }: ConsistencyStripProps) {
    const { activityByDay, activeDays, currentStreak, lastActiveStreak } = consistency;

    const rows = chunkArray(activityByDay, DAYS_PER_ROW);
    const colsPerRow = Math.min(activityByDay.length, DAYS_PER_ROW);

    const getDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Consistency Strip</h2>
                    <InfoTooltip text="Tracks your daily coding habits. A full block means you were active that day." />
                </div>
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

            {/* Activity rows - each row = 30 days */}
            <div className="flex flex-col gap-3 mb-3">
                {rows.map((row, rowIndex) => {
                    const firstDate = row[0]?.date;
                    const lastDate = row[row.length - 1]?.date;
                    return (
                        <div key={rowIndex}>
                            <div
                                className="grid gap-[3px] mb-1"
                                style={{ gridTemplateColumns: `repeat(${colsPerRow}, 1fr)` }}
                            >
                                {row.map((day) => (
                                    <div
                                        key={day.date}
                                        className={`h-8 rounded-sm shadow-sm ${day.hasActivity ? "bg-primary" : "bg-muted"
                                            }`}
                                        title={`${day.date}: ${day.hasActivity ? "Active" : "Inactive"}`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
                                <span>{firstDate && getDateLabel(firstDate)}</span>
                                {lastDate && lastDate !== firstDate && (
                                    <span>{getDateLabel(lastDate)}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-border">
                <div>
                    <div className="text-2xl font-bold text-foreground">{activeDays}</div>
                    <div className="text-xs text-muted-foreground">Days You Shipped</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-foreground">
                        {currentStreak > 0 ? currentStreak : lastActiveStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {currentStreak > 0 ? "Shipping Streak" : "Last Streak"}
                    </div>
                </div>
            </div>
        </div>
    );
}
