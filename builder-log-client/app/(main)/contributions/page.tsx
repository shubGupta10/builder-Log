"use client";

import { useState } from "react";
import useSWR from "swr";
import { getContributions } from "@/app/lib/api/contributions";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { ContributionsSummary } from "@/app/modules/contributions/ContributionsSummary";
import { RepoList } from "@/app/modules/contributions/RepoList";
import { formatDateForAPI, createDateRange } from "@/app/lib/utils/dateUtils";
import { PageShell } from "@/app/components/layout/PageShell";
import { DateRange } from "react-day-picker";

const STALE_TIME = 10 * 60 * 1000;

export default function ContributionsPage() {
    const [date, setDate] = useState<DateRange | undefined>(() => {
        const range = createDateRange(30);
        return { from: range.from, to: range.to };
    });

    const from = date?.from ? formatDateForAPI(date.from) : null;
    const to = date?.to ? formatDateForAPI(date.to) : null;

    const { data, isLoading, error } = useSWR(
        from && to ? ["contributions", from, to] : null,
        () => getContributions({ from: from!, to: to! }).then((r) => r.data),
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
                    <div className="animate-pulse">Loading contributions...</div>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-96 text-destructive text-sm">
                    {error.status === 401 ? "You are not authenticated" : "Failed to load contributions"}
                </div>
            )}

            {!isLoading && !error && data && (
                <>
                    <ContributionsSummary data={data.summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RepoList
                            title="Your Projects"
                            repos={data.ownProjects}
                            emptyMessage="No personal project activity in this range."
                        />
                        <RepoList
                            title="Open Source"
                            repos={data.openSource}
                            emptyMessage="No open source contributions in this range."
                        />
                    </div>
                </>
            )}
        </PageShell>
    );
}
