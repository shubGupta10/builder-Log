"use client";

import { PublicActivity } from "@/app/lib/api/types";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface RecentActivityProps {
    activities: PublicActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    const [page, setPage] = useState(0);
    const itemsPerPage = 4;
    
    if (activities.length === 0) {
        return (
            <div className="py-6">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                </div>
                <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
        );
    }

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentActivities = activities.slice(startIndex, endIndex);
    const hasNext = endIndex < activities.length;
    const hasPrev = page > 0;

    const handleNext = () => {
        if (hasNext) setPage(page + 1);
    };

    const handlePrev = () => {
        if (hasPrev) setPage(page - 1);
    };

    return (
        <div className="py-6">
            <div className="flex items-center gap-2 mb-6">
                <Clock size={18} className="text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="space-y-4">
                {currentActivities.map((activity, index) => {
                    const isCommit = activity.type === "commit";
                    const timeAgo = formatDistanceToNow(new Date(activity.occurredAt), { addSuffix: true });

                    return (
                        <div
                            key={`${activity.repoName}-${activity.occurredAt}-${index}`}
                            className="flex items-start gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"></span>

                            <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-foreground leading-tight mb-1">
                                    {activity.repoName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {isCommit 
                                        ? `commit to ${activity.repoOwner}/${activity.repoName}` 
                                        : `pull request to ${activity.repoOwner}/${activity.repoName}`
                                    }
                                </p>
                            </div>

                            <span className="text-sm text-muted-foreground shrink-0">
                                {timeAgo}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Buttons */}
            {(hasPrev || hasNext) && (
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={!hasPrev}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            hasPrev
                                ? "text-foreground bg-muted hover:bg-muted/80"
                                : "text-muted-foreground bg-muted/50 cursor-not-allowed"
                        }`}
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!hasNext}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            hasNext
                                ? "text-foreground bg-muted hover:bg-muted/80"
                                : "text-muted-foreground bg-muted/50 cursor-not-allowed"
                        }`}
                    >
                        Next
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
