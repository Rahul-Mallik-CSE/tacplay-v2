"use client";

/**
 * DataSection.tsx
 * Common card wrapper with title header and optional "View All" link.
 *
 * Behaviour:
 * - Shows first 5 items by default (collapsed).
 * - "View All" button only appears when items > 5.
 * - Clicking "View All" expands the list into a scrollable container showing all items.
 */

import type { DataSectionProps } from "@/types/DashboardTypes/HomeTypes";

const DataSection = ({
  title,
  viewAllLabel,
  showViewAll,
  onViewAll,
  isExpanded = false,
  children,
}: DataSectionProps) => {
  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex flex-col min-h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-custom-red hover:text-custom-red/80 transition-colors cursor-pointer"
          >
            {viewAllLabel}
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 mb-4" />

      {/* Content — scrollable only when expanded */}
      <div
        className={`flex-1 space-y-0 ${
          isExpanded
            ? "overflow-y-auto max-h-[480px] pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            : "overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DataSection;
