import { ProjectsSummary as SummaryType } from "@/app/lib/api/types";

interface ProjectsSummaryProps {
    summary: SummaryType;
}

export function ProjectsSummary({ summary }: ProjectsSummaryProps) {
    const stats = [
        {
            label: "Total projects",
            value: summary.totalProjects,
            color: "text-foreground",
        },
        {
            label: "Active",
            value: summary.active,
            color: "text-green-500",
        },
        {
            label: "Stalled",
            value: summary.stalled,
            color: "text-amber-500",
        },
        {
            label: "Shipped",
            value: summary.shipped,
            color: "text-muted-foreground",
        },
    ];

    return (
        <div className="flex flex-wrap gap-10 items-center bg-card border border-border shadow-md rounded-xl p-6">
            {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                    <div className={`text-4xl font-bold leading-none ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
