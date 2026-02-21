"use client";

import { useEffect, useState } from "react";
import { getTimeline } from "@/app/lib/api/timeline";
import { TimelineDay } from "@/app/lib/api/types";
import TimelineCard from "@/app/modules/timeline/timelineCard";
import { LimitsInfo } from "@/app/modules/timeline/LimitsInfo";
import { DATE_PRESETS, DEFAULT_PRESET_DAYS } from "@/app/modules/timeline/utils";
import {
  DateRange,
  formatDateRange,
  createDateRange,
  formatDateForAPI,
} from "@/app/lib/utils/dateUtils";
import { PageShell } from "@/app/components/layout/PageShell";

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineDay[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number>(DEFAULT_PRESET_DAYS);
  const [dateRange, setDateRange] = useState<DateRange>(
    createDateRange(DEFAULT_PRESET_DAYS)
  );


  const loadTimeline = async (range: DateRange) => {
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
    loadTimeline(dateRange);
  }, []);

  const handlePresetClick = (days: number) => {
    const newRange = createDateRange(days);
    setDateRange(newRange);
    setSelectedPreset(days);
    loadTimeline(newRange);
  };

  return (
    <PageShell>
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              {formatDateRange(dateRange.from, dateRange.to)}
            </p>
          </div>

          <div className="flex gap-2">
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.days}
                onClick={() => handlePresetClick(preset.days)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors font-medium cursor-pointer ${selectedPreset === preset.days
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted text-foreground"
                  }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <LimitsInfo selectedDays={selectedPreset} />
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
