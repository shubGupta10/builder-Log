"use client";

import { useState } from "react";
import useSWR from "swr";
import { getTimeline } from "@/app/lib/api/timeline";
import { TimelineDay } from "@/app/lib/api/types";
import TimelineCard from "@/app/modules/timeline/timelineCard";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { formatDateForAPI, createDateRange } from "@/app/lib/utils/dateUtils";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRange } from "react-day-picker";

const STALE_TIME = 10 * 60 * 1000;

export default function TimelinePage() {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const range = createDateRange(30);
    return { from: range.from, to: range.to };
  });

  const from = date?.from ? formatDateForAPI(date.from) : null;
  const to = date?.to ? formatDateForAPI(date.to) : null;

  const { data: timeline, isLoading, error } = useSWR<TimelineDay[]>(
    from && to ? ["timeline", from, to] : null,
    () => getTimeline({ from: from!, to: to! }).then((r) => r.timeline),
    {
      dedupingInterval: STALE_TIME,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <PageShell>
      <div className="relative isolate">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.03),transparent_50%)] pointer-events-none -z-10" />

        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <DateRangeSelector date={date} setDate={setDate} />
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center h-48 text-muted-foreground text-sm bg-card border border-border shadow-md rounded-xl mt-8">
            <div className="animate-pulse">Loading timeline...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-48 text-destructive text-sm bg-card border border-border shadow-md rounded-xl mt-8">
            {error.status === 401 ? "You are not authenticated" : "Failed to load timeline"}
          </div>
        )}

        {!isLoading && !error && <TimelineCard timelineData={timeline ?? null} />}
      </div>
    </PageShell>
  );
}
