import React from "react";
import type { Momentum as MomentumType } from "@/app/lib/api/types";
import { InfoTooltip } from "@/app/components/ui/InfoTooltip";

type MomentumSummaryProps = {
    data: MomentumType;
};

export function MomentumSummary({ data }: MomentumSummaryProps) {
    const { trend, avgSessionsPerDay } = data;

    const getTrendIcon = () => {
        switch (trend) {
            case "up":
                return (
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                );
            case "down":
                return (
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                );
            case "flat":
                return (
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                );
        }
    };

    const getTrendColor = () => {
        switch (trend) {
            case "up":
                return "text-green-500";
            case "down":
                return "text-red-500";
            case "flat":
                return "text-muted-foreground";
        }
    };

    const getTrendMessage = () => {
        switch (trend) {
            case "up":
                return "You're building more consistently than last month. Keep it up.";
            case "down":
                return "Activity has decreased. Consider setting aside dedicated coding time.";
            case "flat":
                return "Your activity is steady. Consistency is key.";
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold text-foreground">Momentum Summary</h2>
                <InfoTooltip text="An overall trend of your coding velocity based on daily averages." />
            </div>

            <div className="space-y-6">
                {/* Trend */}
                <div>
                    <div className="text-xs text-muted-foreground mb-2">Current Trend</div>
                    <div className="flex items-center gap-2">
                        {getTrendIcon()}
                        <span className={`text-2xl font-bold capitalize ${getTrendColor()}`}>
                            {trend}
                        </span>
                    </div>
                </div>

                {/* Avg Sessions */}
                <div>
                    <div className="text-xs text-muted-foreground mb-2">Avg Sessions / Day</div>
                    <div className="text-4xl font-bold text-foreground">{avgSessionsPerDay}</div>
                </div>

                {/* Message */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {getTrendMessage()}
                </p>
            </div>
        </div>
    );
}
