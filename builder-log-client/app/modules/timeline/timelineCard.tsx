import { TimelineDay } from "@/app/lib/api/types";
import SessionCard from "./sessionCard";
import { formatFullDate } from "@/app/lib/utils/dateUtils";
import { Clock } from "lucide-react";

function TimelineCard({ timelineData }: { timelineData: TimelineDay[] | null }) {
  if (!timelineData || timelineData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-card border border-border shadow-md rounded-2xl mt-8">
        <div className="w-16 h-16 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm font-medium">No activity found</p>
        <p className="text-muted-foreground text-xs mt-1">Try selecting a different date range</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {timelineData.map((day) => (
        <div key={day.date} className="relative">
          <div className="sticky top-16 z-10 bg-background/60 backdrop-blur-xl pb-3 pt-4 mb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
              <h2 className="text-base font-semibold text-foreground">
                {formatFullDate(day.date)}
              </h2>
              <span className="text-xs text-muted-foreground ml-auto">
                {day.sessions.length} {day.sessions.length === 1 ? "session" : "sessions"}
              </span>
            </div>
          </div>

          <div className="pl-6 border-l border-border/50 space-y-4 pb-8 ml-[5px]">
            {day.sessions.map((session, index) => (
              <SessionCard key={index} session={session} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineCard;