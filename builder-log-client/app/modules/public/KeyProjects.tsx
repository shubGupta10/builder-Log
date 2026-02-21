import { PublicProject } from "@/app/lib/api/types";
import { formatDistanceToNow } from "date-fns";

interface KeyProjectsProps {
    projects: PublicProject[];
}

const statusConfig = {
    active: {
        label: "Active",
        color: "bg-[#dff6e8] text-[#37ca6d]",
    },
    stalled: {
        label: "Stalled",
        color: "bg-[#fdf7e6] text-[#efc23a]",
    },
    shipped: {
        label: "Shipped",
        color: "bg-[#f1f3f4] text-[#2a313d]",
    },
};

export function KeyProjects({ projects }: KeyProjectsProps) {
    if (projects.length === 0) {
        return (
            <div className="py-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Key Projects</h2>
                <p className="text-sm text-muted-foreground">No projects yet</p>
            </div>
        );
    }

    return (
        <div className="py-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Key Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => {
                    const status = statusConfig[project.status];

                    return (
                        <div
                            key={`${project.repoOwner}-${project.repoName}`}
                            className="p-5 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-foreground truncate">
                                        {project.repoName}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {project.repoOwner}
                                    </p>
                                </div>
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color} shrink-0 ml-2`}
                                >
                                    {status.label}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-foreground">
                                        {project.sessionCount}
                                    </span>{" "}
                                    sessions
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-muted-foreground">Updated</span>{" "}
                                    {formatDistanceToNow(new Date(project.lastActivityAt), {
                                        addSuffix: true,
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
