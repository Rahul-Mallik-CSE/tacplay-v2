"use client";

/**
 * RevenueChart.tsx
 * Area chart displaying revenue growth and booking count trends over time.
 * Includes a range selector dropdown (Week/Month/Year) in the header.
 * Shows a blurred lock overlay with upgrade CTA when isLocked is true.
 */

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Euro, Lock, Crown, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type {
  RevenueChartProps,
  DashboardRange,
} from "@/types/DashboardTypes/HomeTypes";
import ChartTooltip from "./ChartTooltip";

const RevenueChart = ({
  title,
  valueDisplay,
  legends,
  chartData,
  selectedRange = "month",
  rangeOptions = ["week", "month", "year"],
  onRangeChange,
  isLocked = false,
  onUpgradeClick,
}: RevenueChartProps) => {
  const { t } = useTranslation("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /** Resolve legend label with i18n translation */
  const getLegendLabel = (label: string) => {
    if (label === "Revenue Growth") return t("home.legends.revenueGrowth");
    if (label === "Booking Count") return t("home.legends.bookingCount");
    return label;
  };

  const legendA = legends[0]?.label
    ? getLegendLabel(legends[0].label)
    : t("home.legends.revenueGrowth");
  const legendB = legends[1]?.label
    ? getLegendLabel(legends[1].label)
    : t("home.legends.bookingCount");

  /** Translate the section title */
  const translatedTitle =
    title === "Revenue" || title === "Total Revenue"
      ? t("home.totalRevenue")
      : title;

  const rangeLabel = (range: DashboardRange) => t(`home.${range}`);

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 relative overflow-hidden flex flex-col">
      {/* Header with title, value, and range dropdown */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-secondary mb-1">{translatedTitle}</p>
          <h2 className="text-xl md:text-3xl font-bold text-primary flex items-center gap-1">
            <Euro className="w-4 h-4" /> {valueDisplay}
          </h2>
        </div>

        {/* Range selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 bg-muted hover:bg-muted/80 text-primary text-xs font-medium px-3 py-1.5 rounded-lg border border-white/5 transition-colors cursor-pointer"
          >
            {rangeLabel(selectedRange)}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-muted border border-white/10 rounded-lg shadow-lg z-20 overflow-hidden">
              {rangeOptions.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    onRangeChange?.(range);
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer",
                    selectedRange === range
                      ? "bg-custom-red text-primary"
                      : "text-primary hover:bg-muted/80",
                  )}
                >
                  {rangeLabel(range)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col">
        {/* Chart area with blur overlay when locked */}
        <div
          className={cn(
            "w-full flex-1 min-h-[200px] transition-all duration-200",
            isLocked &&
              "blur-[2.5px] pointer-events-none select-none opacity-75",
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#980009"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor="#980009"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="bookingGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#b4971e"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor="#b4971e"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
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
                  value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="booking_count"
                name={legendB}
                stroke="#b4971e"
                strokeWidth={2}
                fill="url(#bookingGradient)"
              />
              <Area
                type="monotone"
                dataKey="revenue_growth"
                name={legendA}
                stroke="#980009"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legends */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-custom-red" />
            <span className="text-xs text-secondary">{legendA}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-custom-yellow" />
            <span className="text-xs text-secondary">{legendB}</span>
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
                "home.unlockRevenueTitle",
                "Unlock Revenue Analytics",
              )}
            </h4>
            <p className="text-xs text-secondary max-w-[320px] mb-4 leading-relaxed">
              {t(
                "home.unlockRevenueDesc",
                "Upgrade your plan to Essential for Field Growth or Gold to view interactive charts tracking your weekly, monthly, and yearly revenue growth alongside booking counts.",
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

export default RevenueChart;
