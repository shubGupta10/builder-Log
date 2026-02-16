export type GithubTypeEvent = 'commit' | 'pull_request';

export interface GithubTimelineEvent {
  type: GithubTypeEvent;
  repoOwner: string;
  repoName: string;
  occurredAt: string;
}

export interface GithubCommit {
  sha: string;
  message: string;
  committedAt: string;
  url: string;
}

export interface GithubPullRequest {
  id: string;
  number: number;
  title: string;
  merged: boolean;
  createdAt: string;
  mergedAt?: string;
  url: string;
}