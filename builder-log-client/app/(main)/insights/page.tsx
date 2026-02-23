"use client";

import { useState } from "react";
import useSWR from "swr";
import { getInsights } from "@/app/lib/api/insights";
import type { InsightsData } from "@/app/lib/api/types";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { ConsistencyStrip } from "@/app/modules/insights/ConsistencyStrip";
import { BuildPulse } from "@/app/modules/insights/BuildPulse";
import { WhereYouBuild } from "@/app/modules/insights/WhereYouBuild";
import { formatDateForAPI, createDateRange } from "@/app/lib/utils/dateUtils";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRange } from "react-day-picker";

// 10 minutes — backend Redis is 80min, frontend is a warm layer on top
const STALE_TIME = 10 * 60 * 1000;

export default function InsightsPage() {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const range = createDateRange(30);
    return { from: range.from, to: range.to };
  });

  const from = date?.from ? formatDateForAPI(date.from) : null;
  const to = date?.to ? formatDateForAPI(date.to) : null;

  const { data: insights, isLoading, error } = useSWR<InsightsData>(
    from && to ? ["insights", from, to] : null,
    () => getInsights({ from: from!, to: to! }).then((r) => r.data),
    {
      dedupingInterval: STALE_TIME,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <PageShell>
      <div className="mb-8">
        <DateRangeSelector date={date} setDate={setDate} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-96 text-muted-foreground text-sm">
          <div className="animate-pulse">Loading insights...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-96 text-destructive text-sm">
          {error.status === 401 ? "You are not authenticated" : "Failed to load insights"}
        </div>
      )}

      {!isLoading && !error && insights && (
        <div className="space-y-6">
          <ConsistencyStrip consistency={insights.consistency} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BuildPulse
              sessionsOverTime={insights.sessionsOverTime}
              momentum={insights.momentum}
            />
            <WhereYouBuild data={insights.focusDistribution} />
          </div>
        </div>
      )}
    </PageShell>
  );
}