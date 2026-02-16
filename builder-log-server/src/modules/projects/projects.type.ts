export type Project = {
    repoOwner: string;
    repoName: string;

    status: "active" | "stalled" | "shipped";

    sessionCount: number;
    lastActivityAt: string; // ISO date
};

export type ProjectsResponse = {
    range: {
        from: string;
        to: string;
    };

    summary: {
        totalProjects: number;
        active: number;
        stalled: number;
        shipped: number;
    };

    projects: Project[];
};
