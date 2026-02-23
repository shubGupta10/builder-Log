"use client";

import { useState } from "react";
import { GitCommitHorizontal, GitPullRequest, ChevronDown, ChevronUp } from "lucide-react";

interface RepoContribution {
    repoOwner: string;
    repoName: string;
    commits: number;
    pullRequests: number;
    sessions: number;
}

interface RepoListProps {
    title: string;
    repos: RepoContribution[];
    emptyMessage: string;
    initialCount?: number;
}

export function RepoList({ title, repos, emptyMessage, initialCount = 5 }: RepoListProps) {
    const [showAll, setShowAll] = useState(false);
    const visibleRepos = showAll ? repos : repos.slice(0, initialCount);
    const hasMore = repos.length > initialCount;
    const maxSessions = Math.max(...repos.map((r) => r.sessions), 1);

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <span className="text-xs text-muted-foreground">{repos.length} repos</span>
            </div>

            {repos.length === 0 ? (
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {visibleRepos.map((repo) => {
                            const widthPercent = (repo.sessions / maxSessions) * 100;

                            return (
                                <div key={`${repo.repoOwner}/${repo.repoName}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground truncate">
                                            {repo.repoOwner}/{repo.repoName}
                                        </span>
                                        <span className="text-xs text-muted-foreground shrink-0 ml-3">
                                            {repo.sessions} {repo.sessions === 1 ? "session" : "sessions"}
                                        </span>
                                    </div>

                                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all"
                                            style={{ width: `${widthPercent}%` }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <GitCommitHorizontal size={12} />
                                            {repo.commits} {repo.commits === 1 ? "commit" : "commits"}
                                        </span>
                                        {repo.pullRequests > 0 && (
                                            <span className="flex items-center gap-1">
                                                <GitPullRequest size={12} />
                                                {repo.pullRequests} {repo.pullRequests === 1 ? "PR" : "PRs"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {hasMore && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="mt-4 w-full flex items-center justify-center gap-1 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted cursor-pointer"
                        >
                            {showAll ? (
                                <>Show less <ChevronUp size={16} /></>
                            ) : (
                                <>Show more ({repos.length - initialCount} more) <ChevronDown size={16} /></>
                            )}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
