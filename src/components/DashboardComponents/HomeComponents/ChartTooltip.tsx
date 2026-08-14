"use client";

/**
 * ChartTooltip.tsx
 * Shared custom tooltip component for Recharts charts (Area, Bar).
 * Displays label and formatted values with color-coded entries.
 */

import type { ChartTooltipProps } from "@/types/DashboardTypes/HomeTypes";

const ChartTooltip = ({
  active,
  payload,
  label,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1826] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default ChartTooltip;
