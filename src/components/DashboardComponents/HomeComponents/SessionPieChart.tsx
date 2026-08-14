"use client";

/**
 * SessionPieChart.tsx
 * Donut pie chart displaying today's attendances (Check In, Late, No Show).
 * Uses Recharts PieChart with inner/outer radius for donut style.
 * Shows center text overlay and legend at the bottom with percentages.
 * Displays a blurred lock overlay with upgrade CTA when isLocked is true.
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionPieChartProps } from "@/types/DashboardTypes/HomeTypes";
import { PIE_CHART_COLORS } from "@/types/DashboardTypes/HomeTypes";

const SessionPieChart = ({
  title,
  centerValueDisplay,
  items,
  isLocked = false,
  onUpgradeClick,
}: SessionPieChartProps) => {
  const { t } = useTranslation("dashboard");

  /** Translate attendance type labels */
  const translateLabel = (name: string) => {
    if (name === "Check In") return t("home.attendance.checkIn", "Check In");
    if (name === "Late") return t("home.attendance.late", "Late");
    if (name === "No Show") return t("home.attendance.noShow", "No Show");
    return name;
  };

  /** Calculate total for percentage display */
  const total = items.reduce((sum, item) => sum + item.value, 0);

  /** Map items to chart-compatible format with translated labels */
  const chartData = items.map((item) => ({
    name: translateLabel(item.label),
    value: item.value,
    percent: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }));

  /** Parse center value display (e.g. "40\nCheck In") */
  const centerParts = centerValueDisplay.split("\n");
  const centerNumber = centerParts[0] ?? "";
  const centerLabel = centerParts.slice(1).join("\n");

  /** Translate the section title */
  const translatedTitle =
    title === "Today's Attendances"
      ? t("home.todayAttendances", "Today's Attendances")
      : title === "Session Distribution"
        ? t("home.sessionDistribution")
        : title;

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 relative overflow-hidden flex flex-col">
      <h3 className="text-sm text-secondary mb-1">{translatedTitle}</h3>
      <p className="text-xs text-secondary mb-4">
        {items.reduce((s, i) => s + i.value, 0)}{" "}
        {t("home.attendance.totalPlayer", "Total Player")}
      </p>

      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* Chart and legend area with blur overlay when locked */}
        <div
          className={cn(
            "flex flex-col items-center gap-4 transition-all duration-200",
            isLocked &&
              "blur-[2.5px] pointer-events-none select-none opacity-75",
          )}
        >
          {/* Donut pie chart with center text */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={68}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center text overlay */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-primary">
                {centerNumber}
              </span>
              {centerLabel && (
                <span className="text-[10px] sm:text-xs text-secondary text-center">
                  {centerLabel}
                </span>
              )}
            </div>
          </div>

          {/* Bottom legend bar with percentages */}
          <div className="flex items-center justify-center gap-4 mt-2">
            {chartData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{
                    backgroundColor:
                      PIE_CHART_COLORS[index % PIE_CHART_COLORS.length],
                  }}
                />
                <span className="text-xs text-secondary">{entry.name}</span>
                <span className="text-xs text-secondary">
                  {entry.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lock overlay with upgrade CTA when plan is locked */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0b0f]/50 backdrop-blur-[1.5px] rounded-xl p-6 text-center z-10 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(152,0,9,0.2)] animate-pulse">
              <Lock className="w-5 h-5 text-custom-red" />
            </div>
            <h4 className="text-base font-semibold text-primary mb-1">
              {t(
                "home.unlockSessionTitle",
                "Unlock Session Distribution",
              )}
            </h4>
            <p className="text-xs text-secondary max-w-[320px] mb-4 leading-relaxed">
              {t(
                "home.unlockSessionDesc",
                "Upgrade your plan to Essential for Field Growth or Gold to view match distribution charts analyzing Ranked vs. Social games hosted at your arena.",
              )}
            </p>
            <button
              onClick={onUpgradeClick}
              className="flex items-center gap-1.5 bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_10px_rgba(192,0,105,0.4)] cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#cdba20]" />
              {t("sidebar.upgrade", "Upgrade")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPieChart;
