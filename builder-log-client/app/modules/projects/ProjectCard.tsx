import { Project } from "@/app/lib/api/types";
import { formatDistanceToNow } from "date-fns";
import { GitCommit, Activity, Archive, CheckCircle } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

const statusConfig = {
    active: {
        label: "Active",
        color: "bg-green-500/10 text-green-500 font-semibold",
        icon: Activity,
    },
    stalled: {
        label: "Stalled",
        color: "bg-amber-500/10 text-amber-500 font-semibold",
        icon: Archive,
    },
    shipped: {
        label: "Shipped",
        color: "bg-muted text-muted-foreground font-semibold",
        icon: CheckCircle,
    },
};

export function ProjectCard({ project }: ProjectCardProps) {
    const status = statusConfig[project.status];
    const StatusIcon = status.icon;

    return (
        <div className="group relative p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-200">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.repoOwner}/{project.repoName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {project.repoOwner === "shubGupta10" ? "Personal" : "Organization"}
                    </p>
                </div>
                <span
                    className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-wider flex items-center gap-1.5 ${status.color}`}
                >
                    {status.label}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
                        Sessions
                    </p>
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                        <span className="text-xl">{project.sessionCount}</span>
                    </div>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
                        Last Activity
                    </p>
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                        <span className="text-sm">
                            {formatDistanceToNow(new Date(project.lastActivityAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
