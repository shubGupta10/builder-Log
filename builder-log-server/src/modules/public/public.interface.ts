export interface PublicProfileResponse {
  success: boolean;
  data: {
    profile: ProfileSection;
    summary: SummarySection;
    consistencyStrip: ConsistencyStripSection;
    projects: ProjectItem[];
    recentActivity: ActivityItem[];
    contributions: ContributionsSection;
    meta: MetaSection;
  };
}

export interface ProfileSection {
  username: string;
  displayName: string | null;
  avatarUrl: string;
  bio: string | null;
  githubUrl: string;
  joinedAt: Date;
}

export interface SummarySection {
  activeDays: number;
  currentStreak: number;
  lastActiveStreak: number;
  totalProjects: number;
  momentum: "up" | "down" | "stable";
}

export interface ConsistencyStripSection {
  range: { from: string; to: string };
  activityByDay: Array<{ date: string; hasActivity: boolean }>;
}

export interface ProjectItem {
  repoOwner: string;
  repoName: string;
  status: string;
  sessionCount: number;
  lastActivityAt: string;
}

export interface ActivityItem {
  type: string;
  repoOwner: string;
  repoName: string;
  occurredAt: string;
}

export interface MetaSection {
  generatedAt: string;
  dataRangeDays: number;
}

export interface OpenSourceItem {
  repoOwner: string;
  repoName: string;
  commits: number;
  pullRequests: number;
  sessions: number;
}

export interface ContributionsSection {
  externalRepos: OpenSourceItem[];
  totalExternalContributions: number;
}