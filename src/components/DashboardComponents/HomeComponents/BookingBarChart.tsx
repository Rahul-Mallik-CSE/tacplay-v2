"use client";

/**
 * BookingBarChart.tsx
 * Grouped bar chart displaying booking source breakdown (Premium vs Free).
 * Uses Recharts BarChart with rounded bar tops.
 * Shows value, subtitle, and totals in the header.
 * Displays a blurred lock overlay with upgrade CTA when isLocked is true.
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingBarChartProps } from "@/types/DashboardTypes/HomeTypes";
import ChartTooltip from "./ChartTooltip";

const BookingBarChart = ({
  title,
  valueDisplay,
  subtitle,
  totalsDisplay,
  legends,
  chartData,
  isLocked = false,
  onUpgradeClick,
}: BookingBarChartProps) => {
  const { t } = useTranslation("dashboard");

  /** Resolve legend label with i18n translation */
  const getLegendLabel = (label: string) => {
    if (label === "Premium") return t("home.legends.premium");
    if (label === "Free") return t("home.legends.free");
    if (label === "Booking Count") return t("home.legends.bookingCount");
    return label;
  };

  const legendA = legends[0]?.label
    ? getLegendLabel(legends[0].label)
    : t("home.legends.premium");
  const legendB = legends[1]?.label
    ? getLegendLabel(legends[1].label)
    : t("home.legends.free");

  /** Translate the section title */
  const translatedTitle =
    title === "Booking Source Breakdown"
      ? t("home.bookingSourceBreakdown")
      : title === "Booking Count"
        ? t("home.legends.bookingCount")
        : title;

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 relative overflow-hidden flex flex-col">
      {/* Header with title, value, and legends */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-sm text-secondary">
            {translatedTitle}
          </h3>
          {!isLocked && (
            <h2 className="text-xl md:text-3xl font-bold text-primary mt-1">
              {valueDisplay}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-custom-red" />
            <span className="text-xs text-primary">{legendA}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-custom-yellow" />
            <span className="text-xs text-primary">{legendB}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex-1 flex flex-col justify-end min-h-[200px]">
        {/* Bar chart with blur overlay when locked */}
        <div
          className={cn(
            "w-full h-32 sm:h-40 md:h-48 lg:h-50 transition-all duration-200",
            isLocked &&
              "blur-[2.5px] pointer-events-none select-none opacity-75",
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(82,82,115,0.2)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#525273", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#525273", fontSize: 12 }}
                tickFormatter={(value) =>
                  value >= 1000 ? `${value / 1000}k` : value
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="premium"
                name={legendA}
                fill="#980009"
                radius={[3, 3, 0, 0]}
                barSize={12}
              />
              <Bar
                dataKey="free"
                name={legendB}
                fill="#b4971e"
                radius={[3, 3, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lock overlay with upgrade CTA when plan is locked */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0b0f]/50 backdrop-blur-[1.5px] rounded-xl p-6 text-center z-10 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(152,0,9,0.2)] animate-pulse">
              <Lock className="w-5 h-5 text-custom-red" />
            </div>
            <h4 className="text-base font-semibold text-primary mb-1">
              {t(
                "home.unlockBookingTitle",
                "Unlock Booking Source Breakdown",
              )}
            </h4>
            <p className="text-xs text-secondary max-w-[320px] mb-4 leading-relaxed">
              {t(
                "home.unlockBookingDesc",
                "Upgrade your plan to Essential for Field Growth or Gold to view match booking breakdown analytics between Premium and Free slots.",
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

export default BookingBarChart;
