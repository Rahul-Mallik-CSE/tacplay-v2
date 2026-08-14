"use client";

/**
 * HomeHeader.tsx
 * Renders the dashboard header with title, subtitle, year range selector,
 * and export report button.
 */

import { useState } from "react";
import { CalendarDays, ChevronDown, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface HomeHeaderProps {
  title: string | null;
  subtitle: string | null;
  yearRange: string;
}

const HomeHeader = ({
  title,
  subtitle,
  yearRange,
}: HomeHeaderProps) => {
  const { t } = useTranslation("dashboard");
  const [isYearOpen, setIsYearOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      {/* Left: Title + Subtitle */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {title ?? t("home.analyticsReport")}
        </h1>
        <p className="text-sm text-[#71717a] mt-1">
          {subtitle ?? t("home.analyticsSupport")}
        </p>
      </div>

      {/* Right: Year range dropdown + Export button */}
      <div className="flex items-center gap-3">
        {/* Year range selector */}
        <div className="relative">
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="flex items-center gap-2 bg-[#18181b] hover:bg-[#27272a] text-white text-sm font-medium px-4 py-2.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-[#a1a1aa]" />
            <span>{yearRange}</span>
            <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
          </button>
          {isYearOpen && (
            <div className="absolute right-0 top-full mt-1 bg-[#18181b] border border-white/10 rounded-lg shadow-lg z-20 overflow-hidden min-w-[140px]">
              {["2024-2025", "2025-2026", "2026-2027"].map((range) => (
                <button
                  key={range}
                  onClick={() => setIsYearOpen(false)}
                  className={cn(
                    "block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                    yearRange === range
                      ? "bg-custom-red text-white"
                      : "text-white hover:bg-[#27272a]",
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Report button */}
        <button className="flex items-center gap-2 bg-custom-red hover:bg-custom-red/90 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
          <Download className="w-4 h-4" />
          {t("home.exportReport", "Export Report")}
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
