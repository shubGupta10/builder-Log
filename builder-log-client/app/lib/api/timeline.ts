import { apiFetch } from "./client";
import type { TimelineResponse } from "./types";

export function getTimeline(params?: {
  from?: string;
  to?: string;
}) {
  return apiFetch<TimelineResponse>("/timeline", {
    params,
  });
}
