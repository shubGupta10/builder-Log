import { TimelineEvent } from "@/app/lib/api/types";
import { GitCommitHorizontal, GitPullRequest } from "lucide-react";

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function EventRow({ event }: { event: TimelineEvent }) {
  const isCommit = event.type === "commit";
  const time = formatTime(event.occurredAt);

  return (
    <div className="flex items-center gap-3 py-2.5 border-t border-border">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground shrink-0">
        {isCommit ? (
          <GitCommitHorizontal size={13} strokeWidth={2} />
        ) : (
          <GitPullRequest size={13} strokeWidth={2} />
        )}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-none mb-1">
          {event.repoName}
        </p>
        <span className="text-xs text-muted-foreground">
          {isCommit ? "commit" : "pull request"}
        </span>
      </div>
    </div>
  );
}

export default EventRow;