import { TimelineDay } from "../timeline/timeline.interface.js";

interface RepoContribution {
    repoOwner: string;
    repoName: string;
    commits: number;
    pullRequests: number;
    sessions: number;
}

interface ContributionsResult {
    summary: {
        ownRepos: number;
        externalRepos: number;
        ownCommits: number;
        externalCommits: number;
        ownPRs: number;
        externalPRs: number;
        openSourcePercent: number;
    };
    ownProjects: RepoContribution[];
    openSource: RepoContribution[];
}

export const generateContributions = (
    timeline: TimelineDay[],
    githubUsername: string
): ContributionsResult => {
    const repoMap = new Map<string, RepoContribution>();

    for (const day of timeline) {
        for (const session of day.sessions) {
            const key = `${session.repoOwner}/${session.repoName}`;

            if (!repoMap.has(key)) {
                repoMap.set(key, {
                    repoOwner: session.repoOwner,
                    repoName: session.repoName,
                    commits: 0,
                    pullRequests: 0,
                    sessions: 0,
                });
            }

            const repo = repoMap.get(key)!;
            repo.sessions++;

            for (const event of session.events) {
                if (event.type === "commit") {
                    repo.commits++;
                } else if (event.type === "pull_request") {
                    repo.pullRequests++;
                }
            }
        }
    }

    const allRepos = Array.from(repoMap.values());

    const ownProjects = allRepos
        .filter((r) => r.repoOwner.toLowerCase() === githubUsername.toLowerCase())
        .sort((a, b) => b.sessions - a.sessions);

    const openSource = allRepos
        .filter((r) => r.repoOwner.toLowerCase() !== githubUsername.toLowerCase())
        .sort((a, b) => b.sessions - a.sessions);

    const ownCommits = ownProjects.reduce((sum, r) => sum + r.commits, 0);
    const externalCommits = openSource.reduce((sum, r) => sum + r.commits, 0);
    const ownPRs = ownProjects.reduce((sum, r) => sum + r.pullRequests, 0);
    const externalPRs = openSource.reduce((sum, r) => sum + r.pullRequests, 0);

    const totalActivity = ownCommits + externalCommits + ownPRs + externalPRs;
    const externalActivity = externalCommits + externalPRs;
    const openSourcePercent = totalActivity > 0
        ? Math.round((externalActivity / totalActivity) * 100)
        : 0;

    return {
        summary: {
            ownRepos: ownProjects.length,
            externalRepos: openSource.length,
            ownCommits,
            externalCommits,
            ownPRs,
            externalPRs,
            openSourcePercent,
        },
        ownProjects,
        openSource,
    };
};
