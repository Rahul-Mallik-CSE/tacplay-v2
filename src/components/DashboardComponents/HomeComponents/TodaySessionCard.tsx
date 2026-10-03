"use client";

/**
 * TodaySessionCard.tsx
 * Displays a list of today's sessions with session name, time range, and player capacity.
 * Shows first 5 items; "View All" button appears when there are more than 5.
 */

import { useState } from "react";
import { Clock } from "lucide-react";
import DataSection from "./DataSection";
import type {
  TodaySessionCardProps,
  SessionItem,
} from "@/types/DashboardTypes/HomeTypes";

const PREVIEW_COUNT = 5;

/** Format "22:04:33" → "22:04" */
const fmtTime = (t: string) => t.slice(0, 5);

const SessionRow = ({ item }: { item: SessionItem }) => {
  const timeRange = `${fmtTime(item.start_time)} – ${fmtTime(item.end_time)}`;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      {/* Match-type icon block */}
      <div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        <span className="text-[9px] font-bold text-custom-red uppercase leading-none text-center px-1">
          {item.match_type}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {item.session_name}
        </p>
        <div className="flex items-center gap-1 text-xs text-[#ADADAD]">
          <Clock className="w-3 h-3 shrink-0" />
          <span className="truncate">{timeRange}</span>
        </div>
      </div>

      {/* Capacity badge */}
      <span className="text-xs font-medium px-2.5 py-1 rounded-sm bg-[#E4FAE0] text-[#07B129] shrink-0">
        {item.capacity_display}
      </span>
    </div>
  );
};

const TodaySessionCard = ({
  title,
  viewAllLabel,
  items,
}: TodaySessionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showViewAll = items.length > PREVIEW_COUNT;
  const visibleItems = isExpanded ? items : items.slice(0, PREVIEW_COUNT);

  return (
    <DataSection
      title={title}
      viewAllLabel={isExpanded ? "−" : viewAllLabel}
      showViewAll={showViewAll}
      onViewAll={() => setIsExpanded((prev) => !prev)}
      isExpanded={isExpanded}
    >
      {visibleItems.map((item) => (
        <SessionRow key={item.session_id} item={item} />
      ))}
    </DataSection>
  );
};

export default TodaySessionCard;
