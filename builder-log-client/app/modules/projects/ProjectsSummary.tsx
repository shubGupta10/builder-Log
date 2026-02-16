import { ProjectsSummary as SummaryType } from "@/app/lib/api/types";
import { FolderGit2, Activity, Archive, CheckCircle } from "lucide-react";

interface ProjectsSummaryProps {
    summary: SummaryType;
}

export function ProjectsSummary({ summary }: ProjectsSummaryProps) {
    const stats = [
        {
            label: "Total projects",
            value: summary.totalProjects,
            icon: FolderGit2,
            color: "text-foreground",
        },
        {
            label: "Active",
            value: summary.active,
            icon: Activity,
            color: "text-[#37ca6d]",
        },
        {
            label: "Stalled",
            value: summary.stalled,
            icon: Archive,
            color: "text-[#efc23a]",
        },
        {
            label: "Shipped",
            value: summary.shipped,
            icon: CheckCircle,
            color: "text-[#2a313d]",
        },
    ];

    return (
        <div className="flex flex-wrap gap-6 items-center">
            {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                    <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
                </div>
            ))}
        </div>
    );
}
