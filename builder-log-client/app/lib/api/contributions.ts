import { apiFetch } from "./client";

interface ContributionsParams {
    from: string;
    to: string;
}

export async function getContributions(params: ContributionsParams) {
    return apiFetch<any>("/contributions", {
        params: {
            from: params.from,
            to: params.to,
        },
    });
}
