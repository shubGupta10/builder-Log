import React from "react";
import { Info } from "lucide-react";

type InfoTooltipProps = {
    text: string;
};

export function InfoTooltip({ text }: InfoTooltipProps) {
    return (
        <div className="relative flex items-center group cursor-help">
            <Info className="w-[18px] h-[18px] text-muted-foreground hover:text-foreground transition-colors" strokeWidth={2.5} />

            {/* Tooltip content */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                <div className="bg-popover text-popover-foreground text-xs p-2.5 rounded-md shadow-md border border-border text-center leading-relaxed">
                    {text}
                </div>

                {/* Triangle arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-popover drop-shadow-sm"></div>
            </div>
        </div>
    );
}
