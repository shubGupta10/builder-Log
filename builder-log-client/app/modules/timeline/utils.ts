export interface DatePreset {
  label: string;
  days: number;
  limits: {
    commitLimit: number;
    prLimit: number;
  };
}

export const DATE_PRESETS: DatePreset[] = [
  {
    label: "Last 7 days",
    days: 7,
    limits: { commitLimit: 50, prLimit: 20 },
  },
  {
    label: "Last 30 days",
    days: 30,
    limits: { commitLimit: 30, prLimit: 10 },
  },
  {
    label: "Last 90 days",
    days: 90,
    limits: { commitLimit: 10, prLimit: 5 },
  },
];

export const DEFAULT_PRESET_DAYS = 30;
