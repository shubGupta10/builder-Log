import { Project } from "@/app/lib/api/types";
import { formatDistanceToNow } from "date-fns";
import { GitCommit, Activity, Archive, CheckCircle } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

const statusConfig = {
    active: {
        label: "Active",
        color: "bg-[#dff6e8] text-[#37ca6d]",
        icon: Activity,
    },
    stalled: {
        label: "Stalled",
        color: "bg-[#fdf7e6] text-[#efc23a]",
        icon: Archive,
    },
    shipped: {
        label: "Shipped",
        color: "bg-[#f1f3f4] text-[#2a313d]",
        icon: CheckCircle,
    },
};

export function ProjectCard({ project }: ProjectCardProps) {
    const status = statusConfig[project.status];
    const StatusIcon = status.icon;

    return (
        <div className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/5">
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
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${status.color}`}
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
