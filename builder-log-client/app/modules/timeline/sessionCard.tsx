import { TimelineSession } from "@/app/lib/api/types";
import { formatDuration } from "@/app/lib/utils/dateUtils";
import { GitCommitHorizontal, GitPullRequest, ExternalLink } from "lucide-react";

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function truncateMessage(message: string): string {
  const firstLine = message.split("\n")[0] ?? message;
  return firstLine.length > 72 ? firstLine.slice(0, 72) + "…" : firstLine;
}

function SessionCard({ session }: { session: TimelineSession }) {
  const durationDisplay = formatDuration(session.startTime, session.endTime);
  const commits = session.commits ?? [];
  const prEvents = session.events.filter((e) => e.type === "pull_request");

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm mb-3 last:mb-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm text-muted-foreground truncate">
            {session.repoOwner}
          </span>
          <span className="text-sm text-muted-foreground mx-0.5">/</span>
          <span className="text-sm font-semibold text-foreground truncate">
            {session.repoName}
          </span>
        </div>
        <span className="ml-4 shrink-0 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md tabular-nums">
          {durationDisplay}
        </span>
      </div>

      {/* Summary */}
      <p className="px-4 pb-3 text-sm text-foreground/80 leading-relaxed border-b border-border">
        {session.summary}
      </p>

      {/* Commits */}
      {commits.length > 0 && (
        <div className="px-4">
          {commits.map((commit) => (
            <div
              key={commit.sha}
              className="flex items-start gap-3 py-2.5 border-t border-border"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground shrink-0 mt-0.5">
                <GitCommitHorizontal size={13} strokeWidth={2} />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground leading-snug truncate">
                    {truncateMessage(commit.message)}
                  </p>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    title="View on GitHub"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground font-mono">
                    {commit.sha.slice(0, 7)}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(commit.committedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PR events (keep as-is — no extra detail available) */}
      {prEvents.length > 0 && (
        <div className="px-4">
          {prEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-2.5 border-t border-border"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground shrink-0">
                <GitPullRequest size={13} strokeWidth={2} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-none mb-1">
                  {event.repoName}
                </p>
                <span className="text-xs text-muted-foreground">
                  pull request • {formatTime(event.occurredAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fallback: no commits and no PRs — show generic events */}
      {commits.length === 0 && prEvents.length === 0 && session.events.length > 0 && (
        <div className="px-4">
          {session.events.map((event, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-2.5 border-t border-border"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground shrink-0">
                <GitCommitHorizontal size={13} strokeWidth={2} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-none mb-1">
                  {event.repoName}
                </p>
                <span className="text-xs text-muted-foreground">
                  {event.type === "commit" ? "commit" : "pull request"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionCard;