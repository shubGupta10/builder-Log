
export type TimelineEvent = {
  type: "commit" | "pull_request";
  repoOwner: string;
  repoName: string;
  occurredAt: string;
};

export type TimelineSession = {
  repoOwner: string;
  repoName: string;
  startTime: string;
  endTime: string;
  summary: string;
  commitCount?: number;
  events: TimelineEvent[];
};

export type TimelineDay = {
  date: string;
  sessions: TimelineSession[];
};

export type TimelineResponse = {
  message: string;
  timeline: TimelineDay[];
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

// Insights types
export type ActivityDay = {
  date: string;
  hasActivity: boolean;
};

export type Consistency = {
  activeDays: number;
  currentStreak: number;
  lastActiveStreak: number;
  activityByDay: ActivityDay[];
};

export type SessionsOverTime = {
  period: string;
  sessions: number;
};

export type ActivityMix = {
  commits: number;
  pullRequests: number;
};

export type FocusDistribution = {
  repoOwner: string;
  repoName: string;
  sessions: number;
};

export type Momentum = {
  trend: "up" | "down" | "flat";
  avgSessionsPerDay: number;
};

export type InsightsData = {
  range: {
    from: string;
    to: string;
    totalDays: number;
  };
  consistency: Consistency;
  sessionsOverTime: SessionsOverTime[];
  activityMix: ActivityMix;
  focusDistribution: FocusDistribution[];
  momentum: Momentum;
};

export type InsightsResponse = {
  success: boolean;
  message: string;
  data: InsightsData;
};

export type Project = {
  repoOwner: string;
  repoName: string;
  status: "active" | "stalled" | "shipped";
  sessionCount: number;
  lastActivityAt: string;
};

export type ProjectsSummary = {
  totalProjects: number;
  active: number;
  stalled: number;
  shipped: number;
};

export type ProjectsResponse = {
  message: string;
  data: {
    range: {
      from: string;
      to: string;
    };
    summary: ProjectsSummary;
    projects: Project[];
  };
};

// Settings types
export type GitHubStatus = {
  stats: {
    connected: boolean;
    message: string;
    githubUsername?: string;
    githubAvatarUrl?: string;
    connectedSince?: string;
    oauthScope?: string;
    isBuilderProfile?: boolean;
  };
};

export type ResyncResponse = {
  message: string;
  success: boolean;
};

export type DisconnectResponse = {
  message: string;
  success: boolean;
}; 

// Public Profile types
export type PublicProfile = {
  username: string;
  displayName: string | null;
  avatarUrl: string;
  bio: string | null;
  githubUrl: string;
  joinedAt: string;
};

export type PublicSummary = {
  activeDays: number;
  currentStreak: number;
  lastActiveStreak: number;
  totalProjects: number;
  momentum: "up" | "down" | "stable";
};

export type ConsistencyStrip = {
  range: {
    from: string;
    to: string;
  };
  activityByDay: ActivityDay[];
};

export type PublicProject = {
  repoOwner: string;
  repoName: string;
  status: "active" | "stalled" | "shipped";
  sessionCount: number;
  lastActivityAt: string;
};

export type PublicActivity = {
  type: "commit" | "pull_request";
  repoOwner: string;
  repoName: string;
  occurredAt: string;
};

export type PublicProfileData = {
  profile: PublicProfile;
  summary: PublicSummary;
  consistencyStrip: ConsistencyStrip;
  projects: PublicProject[];
  recentActivity: PublicActivity[];
  meta: {
    generatedAt: string;
    dataRangeDays: number;
  };
};

export type PublicProfileResponse = {
  success: boolean;
  data: PublicProfileData;
};