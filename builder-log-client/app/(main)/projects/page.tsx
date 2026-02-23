"use client";

import { useState } from "react";
import useSWR from "swr";
import { getProjects } from "@/app/lib/api/projects";
import { ProjectsResponse } from "@/app/lib/api/types";
import { ProjectsSummary } from "@/app/modules/projects/ProjectsSummary";
import { ProjectsList } from "@/app/modules/projects/ProjectsList";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { formatDateForAPI, createDateRange } from "@/app/lib/utils/dateUtils";
import { DateRange } from "react-day-picker";

// Projects data is the most static — 15min frontend cache
const STALE_TIME = 15 * 60 * 1000;

export default function ProjectsPage() {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const range = createDateRange(30);
    return { from: range.from, to: range.to };
  });

  const from = date?.from ? formatDateForAPI(date.from) : null;
  const to = date?.to ? formatDateForAPI(date.to) : null;

  const { data, isLoading, error } = useSWR<ProjectsResponse["data"]>(
    from && to ? ["projects", from, to] : null,
    () => getProjects({ from: from!, to: to! }).then((r) => r.data),
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
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-48 text-destructive text-sm">
          {error.status === 401 ? "You are not authenticated" : "Failed to load projects. Please try again later."}
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          <div className="mb-6">
            <ProjectsSummary summary={data.summary} />
          </div>
          <div>
            <ProjectsList projects={data.projects} />
          </div>
        </>
      )}
    </PageShell>
  );
}