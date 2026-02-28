import { InfoTooltip } from "@/app/components/ui/InfoTooltip";

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
            <div className="bg-card border border-border shadow-md rounded-xl p-6 flex flex-col gap-2">
                <div className="text-4xl font-bold text-foreground leading-none">{data.ownRepos}</div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Your Projects</div>
                    <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                        {data.ownCommits} commits · {data.ownPRs} PRs
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border shadow-md rounded-xl p-6 flex flex-col gap-2">
                <div className="text-4xl font-bold text-foreground leading-none">{data.externalRepos}</div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Open Source</div>
                    <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                        {data.externalCommits} commits · {data.externalPRs} PRs
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border shadow-md rounded-xl p-6 flex flex-col gap-2">
                <div className="text-4xl font-bold text-foreground leading-none">{data.ownPRs + data.externalPRs}</div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Total PRs</div>
                    <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                        Across all projects
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border shadow-md rounded-xl p-6 flex flex-col gap-2">
                <div className="text-4xl font-bold text-foreground leading-none">{data.openSourcePercent}%</div>
                <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Open Source %</div>
                    <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                        Of total activity
                    </div>
                </div>
            </div>
        </div>
    );
}
