"use client";

/**
 * SessionPieChart.tsx
 * Donut pie chart displaying session distribution (Ranked vs Social matches).
 * Uses Recharts PieChart with inner/outer radius for donut style.
 * Shows center text overlay and legend at the bottom.
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
  const { t, i18n } = useTranslation("dashboard");

  /** Translate session type labels (Ranked/Social) */
  const translateLabel = (name: string) => {
    if (name === "Ranked" || name === "Ranked Match")
      return t("sessions.filters.rankedMatch");
    if (name === "Social" || name === "Social Match")
      return t("sessions.filters.socialMatch");
    return name;
  };

  /** Translate the center value display text based on current language */
  const getCenterValueDisplay = (val: string) => {
    if (!val) return val;
    const currentLang = i18n.language;
    if (val.toLowerCase().includes("locked")) {
      return val.replace(/locked/gi, t("common.locked") || "Locked");
    }
    if (val.toLowerCase().includes("total sessions")) {
      if (currentLang === "es")
        return val.replace(/total sessions/gi, "Total de sesiones");
      if (currentLang === "fr")
        return val.replace(/total sessions/gi, "Total des sessions");
      if (currentLang === "de")
        return val.replace(
          /total sessions/gi,
          "Sitzungen insgesamt",
        );
    } else if (val.toLowerCase().includes("sessions")) {
      return val.replace(/sessions/gi, t("sidebar.sessions"));
    }
    return val;
  };

  /** Map items to chart-compatible format with translated labels */
  const chartData = items.map((item) => ({
    name: translateLabel(item.label),
    value: item.value,
  }));

  /** Translate the section title */
  const translatedTitle =
    title === "Session Distribution"
      ? t("home.sessionDistribution")
      : title === "Sessions"
        ? t("sidebar.sessions")
        : title;

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex-1 relative overflow-hidden flex flex-col">
      <h3 className="text-base md:text-lg font-semibold text-secondary mb-4">
        {translatedTitle}
      </h3>

      <div className="relative flex-1 flex flex-col justify-between">
        {/* Chart and legend area with blur overlay when locked */}
        <div
          className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-center relative gap-4 transition-all duration-200",
            isLocked &&
              "blur-[2.5px] pointer-events-none select-none opacity-75",
          )}
        >
          {/* Donut pie chart with center text */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-45 lg:h-45 mx-auto sm:mx-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[10px] sm:text-xs text-secondary text-center px-4">
                {getCenterValueDisplay(centerValueDisplay)}
              </span>
            </div>
          </div>

          {/* Value legend next to chart */}
          <div className="flex flex-col gap-2 sm:ml-4">
            {chartData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: PIE_CHART_COLORS[index] }}
                />
                <span className="text-xs text-secondary whitespace-nowrap">
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom legend bar */}
        <div
          className={cn(
            "flex items-center justify-center gap-6 mt-4 transition-all duration-200",
            isLocked &&
              "blur-[1.5px] pointer-events-none select-none opacity-60",
          )}
        >
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{
                  backgroundColor:
                    PIE_CHART_COLORS[index % PIE_CHART_COLORS.length],
                }}
              />
              <span className="text-xs text-secondary">
                {entry.name}
              </span>
            </div>
          ))}
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
