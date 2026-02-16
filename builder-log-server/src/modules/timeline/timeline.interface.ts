import { GithubTimelineEvent } from "../../integrations/github/github.types.js";

export interface TimelineSession {
  repoOwner: string;
  repoName: string;
  startTime: string;
  endTime: string;
  events: GithubTimelineEvent[];
  summary: string;
}

export interface TimelineDay {
  date: string;
  sessions: TimelineSession[];
}

export const SESSION_GAP_MINUTES = 90;