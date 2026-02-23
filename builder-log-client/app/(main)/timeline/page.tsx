"use client";

import { useEffect, useState } from "react";
import { getTimeline } from "@/app/lib/api/timeline";
import { TimelineDay } from "@/app/lib/api/types";
import TimelineCard from "@/app/modules/timeline/timelineCard";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import {
  formatDateForAPI,
  createDateRange,
} from "@/app/lib/utils/dateUtils";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRange } from "react-day-picker";

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineDay[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const range = createDateRange(30); // Default to last 30 days
    return {
      from: range.from,
      to: range.to
    };
  });

  const loadTimeline = async (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    setLoading(true);
    setError(null);
    try {
      const res = await getTimeline({
        from: formatDateForAPI(range.from),
        to: formatDateForAPI(range.to),
      });
      setTimeline(res.timeline);
    } catch (err: any) {
      if (err.status === 401) {
        setError("You are not authenticated");
      } else {
        setError("Failed to load timeline");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimeline(date);
  }, [date]);

  return (
    <PageShell>
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <DateRangeSelector date={date} setDate={setDate} />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          <div className="animate-pulse">Loading timeline...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-48 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && <TimelineCard timelineData={timeline} />}
    </PageShell>
  );
}
