import { ConsistencyStrip as ConsistencyData } from "@/app/lib/api/types";

interface ConsistencyGridProps {
    consistency: ConsistencyData;
}

export function ConsistencyGrid({ consistency }: ConsistencyGridProps) {
    const { activityByDay } = consistency;
    const totalDays = activityByDay.length;

    // Get date labels
    const getDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const firstDate = activityByDay[0]?.date;
    const midDate = activityByDay[Math.floor(totalDays / 2)]?.date;
    const lastDate = activityByDay[totalDays - 1]?.date;

    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                    Consistency (Last {totalDays} Days)
                </h2>
                <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-muted"></div>
                        <span className="text-muted-foreground">Inactive</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-primary"></div>
                        <span className="text-muted-foreground">Active</span>
                    </div>
                </div>
            </div>

            {/* Activity strip */}
            <div className="mb-3">
                <div className="flex gap-1 mb-2">
                    {activityByDay.map((day, index) => (
                        <div
                            key={day.date}
                            className={`flex-1 h-10 rounded-sm transition-colors ${
                                day.hasActivity ? "bg-primary" : "bg-muted"
                            }`}
                            title={`${day.date}: ${day.hasActivity ? "Active" : "Inactive"}`}
                        />
                    ))}
                </div>

                {/* Date labels */}
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>{firstDate && getDateLabel(firstDate)}</span>
                    <span>{midDate && getDateLabel(midDate)}</span>
                    <span>{lastDate && getDateLabel(lastDate)}</span>
                </div>
            </div>
        </div>
    );
}
