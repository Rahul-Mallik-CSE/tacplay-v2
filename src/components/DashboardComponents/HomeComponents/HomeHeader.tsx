"use client";

/**
 * HomeHeader.tsx
 * Renders the dashboard header with title, subtitle, all-reports button,
 * and time-range selector.
 */

import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { DashboardRange } from "@/types/DashboardTypes/HomeTypes";

interface HomeHeaderProps {
  title: string | null;
  subtitle: string | null;
  reportType: string | null;
  visibleRanges: DashboardRange[];
  selectedRange: DashboardRange;
  onRangeChange: (range: DashboardRange) => void;
}

const HomeHeader = ({
  title,
  subtitle,
  reportType,
  visibleRanges,
  selectedRange,
  onRangeChange,
}: HomeHeaderProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {title ?? t("home.analyticsReport")}
        </h1>
        <p className="text-sm text-secondary mt-0.5">
          {subtitle ?? t("home.analyticsSupport")}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-wrap justify-end">
        <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-primary text-sm font-medium px-4 py-2 rounded-lg border border-white/5 transition-colors">
          <FileText className="w-4 h-4" />
          {reportType ?? t("home.allReports")}
        </button>

        <div className="flex bg-muted rounded-lg p-0.5 border border-white/5">
          {visibleRanges.map((range) => (
            <button
              key={range}
              onClick={() => onRangeChange(range)}
              className={`px-3 py-2 cursor-pointer text-xs font-medium rounded-md transition-all ${
                selectedRange === range
                  ? "bg-custom-red text-primary"
                  : "text-primary hover:text-secondary"
              }`}
            >
              {t(`home.${range}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
