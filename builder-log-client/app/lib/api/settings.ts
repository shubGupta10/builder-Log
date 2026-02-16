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
