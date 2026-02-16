import React from "react";

type DateRangeHeaderProps = {
    from: string;
    to: string;
    totalDays: number;
};

export function DateRangeHeader({ from, to, totalDays }: DateRangeHeaderProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm text-foreground">
                <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <span>
                    {formatDate(from)} - {formatDate(to)}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="font-medium">{totalDays} Days</span>
            </div>
        </div>
    );
}
