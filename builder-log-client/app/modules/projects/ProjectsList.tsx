import { Project } from "@/app/lib/api/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectsListProps {
    projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found for this period.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={`${project.repoOwner}/${project.repoName}`} project={project} />
            ))}
        </div>
    );
}
