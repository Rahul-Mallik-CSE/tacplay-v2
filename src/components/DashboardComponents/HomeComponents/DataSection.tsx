"use client";

/**
 * DataSection.tsx
 * Common card wrapper with title header and "View All" link.
 */

import type { DataSectionProps } from "@/types/DashboardTypes/HomeTypes";

const DataSection = ({
  title,
  viewAllLabel,
  onViewAll,
  children,
}: DataSectionProps) => {
  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex flex-col min-h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-custom-red hover:text-custom-red/80 transition-colors cursor-pointer"
        >
          {viewAllLabel}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 mb-4" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-0">{children}</div>
    </div>
  );
};

export default DataSection;
