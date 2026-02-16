import { apiFetch } from "./client";
import type { ProjectsResponse } from "./types";

export function getProjects(params?: {
    from?: string;
    to?: string;
}) {
    return apiFetch<ProjectsResponse>("/projects", {
        params,
    });
}
