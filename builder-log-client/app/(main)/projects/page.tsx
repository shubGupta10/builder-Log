"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/app/lib/api/projects";
import { ProjectsResponse } from "@/app/lib/api/types";
import { ProjectsSummary } from "@/app/modules/projects/ProjectsSummary";
import { ProjectsList } from "@/app/modules/projects/ProjectsList";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { formatDateForAPI, createDateRange } from "@/app/lib/utils/dateUtils";
import { DateRange } from "react-day-picker";

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const range = createDateRange(30);
    return {
      from: range.from,
      to: range.to
    };
  });

  useEffect(() => {
    async function fetchProjects() {
      if (!date?.from || !date?.to) return;

      try {
        setLoading(true);
        const response = await getProjects({
          from: formatDateForAPI(date.from),
          to: formatDateForAPI(date.to),
        });
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [date]);

  return (
    <PageShell>
      <div className="mb-8">
        <DateRangeSelector date={date} setDate={setDate} />
      </div>

      {loading && (
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-48 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && data && (
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