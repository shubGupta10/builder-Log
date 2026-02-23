"use client";

import { useEffect, useState } from "react";
import { getInsights } from "@/app/lib/api/insights";
import type { InsightsData } from "@/app/lib/api/types";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { ConsistencyStrip } from "@/app/modules/insights/ConsistencyStrip";
import { SessionsOverTime } from "@/app/modules/insights/SessionsOverTime";
import { ActivityMix } from "@/app/modules/insights/ActivityMix";
import { FocusDistribution } from "@/app/modules/insights/FocusDistribution";
import { MomentumSummary } from "@/app/modules/insights/MomentumSummary";
import { formatDateForAPI, createDateRange } from "@/app/lib/utils/dateUtils";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRange } from "react-day-picker";

export default function InsightsPage() {
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const range = createDateRange(30);
    return {
      from: range.from,
      to: range.to
    };
  });

  const loadInsights = async (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    setLoading(true);
    setError(null);
    try {
      const res = await getInsights({
        from: formatDateForAPI(range.from),
        to: formatDateForAPI(range.to),
      });
      setInsights(res.data);
    } catch (err: any) {
      if (err.status === 401) {
        setError("You are not authenticated");
      } else {
        setError("Failed to load insights");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights(date);
  }, [date]);

  return (
    <PageShell>
      <div className="mb-8">
        <DateRangeSelector date={date} setDate={setDate} />
      </div>

      {loading && (
        <div className="flex items-center justify-center h-96 text-muted-foreground text-sm">
          <div className="animate-pulse">Loading insights...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-96 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && insights && (
        <>
          <ConsistencyStrip consistency={insights.consistency} />

          {/* Two-column grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left column */}
            <div className="space-y-6">
              <SessionsOverTime data={insights.sessionsOverTime} />
              <ActivityMix
                data={insights.activityMix}
                sessionsOverTime={insights.sessionsOverTime}
              />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <MomentumSummary data={insights.momentum} />
              <FocusDistribution data={insights.focusDistribution} />
            </div>
          </div>
        </>
      )}
    </PageShell>
  );
}