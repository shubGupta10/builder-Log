import { apiFetch } from "./client";
import { PublicProfileResponse } from "./types";

export async function getPublicProfile(username: string): Promise<PublicProfileResponse> {
    return apiFetch<PublicProfileResponse>(`/public/${username}`, {
        method: 'GET',
    });
}
