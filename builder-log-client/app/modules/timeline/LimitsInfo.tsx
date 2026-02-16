import { Info } from "lucide-react";
import { DATE_PRESETS } from "./utils";

interface LimitsInfoProps {
  selectedDays: number;
}

export function LimitsInfo({ selectedDays }: LimitsInfoProps) {
  const preset = DATE_PRESETS.find((p) => p.days === selectedDays);

  if (!preset) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg border border-border">
      <Info className="w-3.5 h-3.5" />
      <span>
        Showing up to <strong>{preset.limits.commitLimit}</strong> commits & <strong>{preset.limits.prLimit}</strong> PRs
        per repository
      </span>
    </div>
  );
}
