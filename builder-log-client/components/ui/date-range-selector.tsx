"use client"

import * as React from "react"
import { format, subDays, differenceInDays } from "date-fns"
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const PRESETS = [
    { label: "7D", days: 7 },
    { label: "30D", days: 30 },
    { label: "90D", days: 90 },
    { label: "6M", days: 180 },
    { label: "1Y", days: 365 },
]

const MAX_DAYS = 365

interface DateRangeSelectorProps {
    date: DateRange | undefined
    setDate: (date: DateRange | undefined) => void
}

export function DateRangeSelector({ date, setDate }: DateRangeSelectorProps) {
    const [activePreset, setActivePreset] = React.useState<number | null>(30)
    const [open, setOpen] = React.useState(false)
    const [dateError, setDateError] = React.useState<string | null>(null)

    const handlePreset = (days: number) => {
        setDateError(null)
        setActivePreset(days)
        setDate({
            from: subDays(new Date(), days),
            to: new Date(),
        })
    }

    const handleCustomSelect = (range: DateRange | undefined) => {
        setActivePreset(null)

        if (range?.from && range?.to) {
            const span = differenceInDays(range.to, range.from)
            if (span > MAX_DAYS) {
                setDateError("Date range cannot exceed 1 year. Please pick a shorter range.")
                return
            }
        }

        setDateError(null)
        setDate(range)
        if (range?.from && range?.to) {
            setOpen(false)
        }
    }

    const customLabel = () => {
        if (activePreset !== null) return null
        if (date?.from && date?.to) {
            return `${format(date.from, "MMM d")} – ${format(date.to, "MMM d, y")}`
        }
        return "Custom"
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
                {PRESETS.map((preset) => (
                    <button
                        key={preset.days}
                        onClick={() => handlePreset(preset.days)}
                        className={cn(
                            "px-3 py-1.5 text-xs font-semibold rounded-md border transition-all duration-150 cursor-pointer",
                            activePreset === preset.days
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-foreground border-border hover:bg-muted"
                        )}
                    >
                        {preset.label}
                    </button>
                ))}

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all duration-150 cursor-pointer",
                                activePreset === null && !dateError
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : dateError
                                        ? "bg-destructive/10 text-destructive border-destructive"
                                        : "bg-card text-foreground border-border hover:bg-muted"
                            )}
                        >
                            <CalendarIcon className="h-3 w-3" />
                            {customLabel() ?? "Custom"}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-border" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={date?.from ?? subDays(new Date(), 30)}
                            selected={date}
                            onSelect={handleCustomSelect}
                            numberOfMonths={1}
                            disabled={{ after: new Date() }}
                        />
                        {dateError && (
                            <div className="flex items-center gap-2 px-3 py-2 border-t border-border bg-destructive/10 text-destructive text-xs rounded-b-md">
                                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                {dateError}
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
