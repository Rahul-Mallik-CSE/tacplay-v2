"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import type { RevenueSourceSection } from "@/types/DashboardTypes/AnalyticsTypes"

interface RevenueSourceChartProps {
  section?: RevenueSourceSection | null
  periodOptions?: string[]
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
}

const SOURCE_COLORS: Record<string, string> = {
  walk_in: "#EF4444",
  online_booking: "#EAB308",
  package: "#6366F1",
  other: "#10B981",
}

function getCurrencySymbol(currency?: string): string {
  if (!currency) return "€"
  switch (currency.toUpperCase()) {
    case "EUR":
      return "€"
    case "USD":
      return "$"
    case "GBP":
      return "£"
    default:
      return currency
  }
}

function formatCurrency(val?: string | number, currency?: string): string {
  if (val === undefined || val === null) return "0.00"
  const num = typeof val === "number" ? val : parseFloat(String(val)) || 0
  const symbol = getCurrencySymbol(currency)
  return `${symbol} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function RevenueSourceChart({
  section,
  periodOptions = ["day", "week", "month", "year"],
  selectedPeriod,
  onPeriodChange,
}: RevenueSourceChartProps) {
  const { t } = useTranslation("dashboard")

  const currentPeriod = selectedPeriod || section?.period || "week"
  const currencySymbol = getCurrencySymbol(section?.currency)

  const rawItems = section?.items || []
  const hasData = rawItems.some((item) => (parseFloat(item.revenue) || item.percentage) > 0)

  // Map chart data with colors
  const chartData = rawItems.map((item, index) => {
    const defaultColor = ["#EF4444", "#EAB308", "#6366F1", "#10B981", "#EC4899"][index % 5]
    const color = SOURCE_COLORS[item.key] || item.color || defaultColor
    const numValue = parseFloat(item.revenue) || item.percentage || 0
    return {
      name: item.label,
      key: item.key,
      value: hasData ? numValue : 1, // Fallback placeholder slice if all 0
      displayAmount: formatCurrency(item.revenue, section?.currency),
      percentage: item.percentage_display,
      bookingCount: item.booking_count,
      color,
    }
  })

  const centerValue = section?.center?.value ?? 0
  const centerLabel = section?.center?.label || t("analytics.checkIn", "Check In")

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="rounded-xl border border-white/5 bg-card/60 backdrop-blur-xs p-4 sm:p-6 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {section?.title || t("analytics.revenueSource", "Revenue Source")}
          </h3>
          <p className="text-xs text-secondary mt-0.5">
            Total: {formatCurrency(section?.total_revenue, section?.currency)}
          </p>
        </div>

        <select
          value={currentPeriod}
          onChange={(e) => onPeriodChange?.(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-white/20 transition-colors"
          aria-label="Revenue source period"
        >
          {periodOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-card text-primary">
              {capitalize(opt)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length && hasData) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-card/95 border border-white/10 text-primary px-3 py-2 rounded-lg shadow-xl text-xs backdrop-blur-md">
                        <p className="font-semibold">{data.name}</p>
                        <p className="font-bold text-emerald-400">{data.displayAmount}</p>
                        <p className="text-secondary">{data.percentage} ({data.bookingCount} bookings)</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={hasData ? 3 : 0}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={hasData ? entry.color : "rgba(255,255,255,0.06)"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-primary tracking-tight">
              {centerValue}
            </span>
            <span className="text-xs text-secondary font-medium capitalize">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full mt-6 space-y-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-primary truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-primary font-medium">{item.displayAmount}</span>
                <span className="text-secondary w-12 text-right">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
