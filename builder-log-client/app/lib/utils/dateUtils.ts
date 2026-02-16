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
