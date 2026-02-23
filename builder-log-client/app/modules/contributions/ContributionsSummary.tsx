import { InfoTooltip } from "@/app/components/ui/InfoTooltip";
import { GitFork, Code, GitPullRequest } from "lucide-react";

interface ContributionsSummaryProps {
    ownRepos: number;
    externalRepos: number;
    ownCommits: number;
    externalCommits: number;
    ownPRs: number;
    externalPRs: number;
    openSourcePercent: number;
}

export function ContributionsSummary({ data }: { data: ContributionsSummaryProps }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Your Projects</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{data.ownRepos}</div>
                <div className="text-xs text-muted-foreground mt-1">
                    {data.ownCommits} commits · {data.ownPRs} PRs
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <GitFork className="w-4 h-4 text-chart-2" />
                    <span className="text-xs text-muted-foreground">Open Source</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{data.externalRepos}</div>
                <div className="text-xs text-muted-foreground mt-1">
                    {data.externalCommits} commits · {data.externalPRs} PRs
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <GitPullRequest className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Total PRs</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{data.ownPRs + data.externalPRs}</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <GitFork className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Open Source %</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{data.openSourcePercent}%</div>
                <div className="text-xs text-muted-foreground mt-1">
                    of your total activity
                </div>
            </div>
        </div>
    );
}
