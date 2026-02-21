import { apiFetch } from "./client";
import type { GitHubStatus, ResyncResponse, DisconnectResponse } from "./types";

export function getGitHubStatus() {
    return apiFetch<GitHubStatus>("/settings/github-status");
}

export function resyncGitHub() {
    return apiFetch<ResyncResponse>("/settings/resyncGithub", {
        method: "GET",
    });
}

export function disconnectGitHub() {
    return apiFetch<DisconnectResponse>("/settings/disconnectUser", {
        method: "GET",
    });
}

export function toggleBuilderProfile(isBuilderProfile: boolean) {
    return apiFetch<{ message: string; isBuilderProfile: boolean }>("/settings/builder-profile", {
        method: "PATCH",
        body: JSON.stringify({ isBuilderProfile }),
    });
}
