import { TimelineSession } from "@/app/lib/api/types";
import EventRow from "./eventRow";
import { formatDuration } from "@/app/lib/utils/dateUtils";

function SessionCard({ session }: { session: TimelineSession }) {
  const durationDisplay = formatDuration(session.startTime, session.endTime);

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

      {/* Events */}
      {session.events.length > 0 && (
        <div className="px-4 pb-1">
          {session.events.map((event, idx) => (
            <EventRow key={idx} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionCard;