import { format, subDays } from "date-fns";

export interface DateRange {
  from: Date;
  to: Date;
}

export const formatDateRange = (from: Date, to: Date): string => {
  return `${format(from, "MMM d, yyyy")} - ${format(to, "MMM d, yyyy")}`;
};

export const formatFullDate = (dateStr: string): string => {
  return format(new Date(dateStr), "EEEE, MMMM d, yyyy");
};

export const createDateRange = (daysAgo: number): DateRange => {
  const to = new Date();
  const from = subDays(to, daysAgo);
  return { from, to };
};

export const formatDateForAPI = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const formatDuration = (startIso: string, endIso: string): string => {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();

  // Difference in minutes
  const diffInMinutes = Math.floor((end - start) / 60000);

  // If difference is less than 1 minute (e.g. single event session), show minimum 1m
  if (diffInMinutes < 1) {
    return "1m";
  }

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes}m`;
};
