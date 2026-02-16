import { apiFetch } from "./client";
import type { InsightsResponse } from "./types";

export function getInsights(params?: {
    from?: string;
    to?: string;
}) {
    return apiFetch<InsightsResponse>("/insights", {
        params,
    });
}
