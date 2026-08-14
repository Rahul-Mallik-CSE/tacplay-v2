"use client";

/**
 * UpcomingSessionCard.tsx
 * Displays a list of upcoming sessions with date block, name, time, and player count.
 */

import { Clock } from "lucide-react";
import DataSection from "./DataSection";
import type { UpcomingSessionCardProps } from "@/types/DashboardTypes/HomeTypes";

const UpcomingSessionCard = ({
  title,
  viewAllLabel,
  items,
  onViewAll,
}: UpcomingSessionCardProps) => {
  return (
    <DataSection
      title={title}
      viewAllLabel={viewAllLabel}
      onViewAll={onViewAll}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 py-3 ${
            index < items.length - 1 ? "border-b border-white/5" : ""
          }`}
        >
          {/* Date block */}
          <div className="w-12 h-14 rounded-lg bg-white flex flex-col items-center justify-center flex-shrink-0">
            <span className="text-[9px] font-bold text-[#980009] uppercase leading-none">
              {item.month}
            </span>
            <span className="text-lg font-bold text-[#18181b] leading-tight">
              {item.day}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {item.sessionName}
            </p>
            <div className="flex items-center gap-1 text-xs text-[#71717a]">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{item.timeRange}</span>
            </div>
          </div>

          {/* Player count badge */}
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 flex-shrink-0">
            {item.playersCount}
          </span>
        </div>
      ))}
    </DataSection>
  );
};

export default UpcomingSessionCard;
