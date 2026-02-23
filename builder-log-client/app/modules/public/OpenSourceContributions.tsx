import { GitFork, GitCommitHorizontal, GitPullRequest } from "lucide-react";

interface OpenSourceRepo {
    repoOwner: string;
    repoName: string;
    commits: number;
    pullRequests: number;
    sessions: number;
}

interface OpenSourceContributionsProps {
    repos: OpenSourceRepo[];
    totalContributions: number;
}

export function OpenSourceContributions({ repos, totalContributions }: OpenSourceContributionsProps) {
    if (repos.length === 0) return null;

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <GitFork className="w-5 h-5 text-chart-2" />
                    <h2 className="text-lg font-semibold text-foreground">Open Source Contributions</h2>
                </div>
                <span className="text-xs text-muted-foreground">
                    {totalContributions} total contributions
                </span>
            </div>

            <div className="space-y-3">
                {repos.map((repo) => (
                    <div
                        key={`${repo.repoOwner}/${repo.repoName}`}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {repo.repoOwner}/{repo.repoName}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3 text-xs text-muted-foreground">
                            {repo.commits > 0 && (
                                <span className="flex items-center gap-1">
                                    <GitCommitHorizontal size={12} />
                                    {repo.commits}
                                </span>
                            )}
                            {repo.pullRequests > 0 && (
                                <span className="flex items-center gap-1">
                                    <GitPullRequest size={12} />
                                    {repo.pullRequests}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
