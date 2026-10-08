"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { DonutChartDataItem } from "@/types/AdminTypes/AnalyticsTypes"

interface DonutChartProps {
  data: DonutChartDataItem[]
  title?: string
  centerLabel?: string
  centerSubLabel?: string
  defaultTimeRange?: string
  showPeriodSelector?: boolean
  selectedPeriod?: string
  periodOptions?: Array<{ label: string; value: string }>
  onPeriodChange?: (period: string) => void
}

export default function DonutChart({
  data,
  title,
  centerLabel,
  centerSubLabel,
  defaultTimeRange = "Month",
  showPeriodSelector = false,
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: DonutChartProps) {
  const { t } = useTranslation("dashboard")
  const [internalTimeRange, setInternalTimeRange] = useState(defaultTimeRange)

  const activePeriod = selectedPeriod || internalTimeRange
  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  const chartData =
    totalValue > 0
      ? data
      : [{ name: "No data", value: 1, amount: "0", percentage: "0%", color: "rgba(255,255,255,0.08)" }]

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {title}
        </h3>
        {showPeriodSelector && (
          <select
            value={activePeriod}
            onChange={(e) => {
              setInternalTimeRange(e.target.value)
              onPeriodChange?.(e.target.value)
            }}
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
          >
            {periodOptions && periodOptions.length > 0 ? (
              periodOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            ) : (
              <>
                <option value="month">{t("adminAnalytics.month", "Month")}</option>
                <option value="week">{t("adminAnalytics.week", "Week")}</option>
                <option value="day">{t("adminAnalytics.day", "Day")}</option>
              </>
            )}
          </select>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={totalValue > 0 ? 3 : 0}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-primary">
              {centerLabel !== undefined ? centerLabel : totalValue.toLocaleString()}
            </span>
            {centerSubLabel && (
              <span className="text-xs text-muted-foreground mt-0.5">
                {centerSubLabel}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-6 space-y-3">
          {data.map((item, index) => {
            const displayName = item.name.startsWith("adminAnalytics.")
              ? t(item.name)
              : item.name

            return (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-primary truncate">
                    {displayName}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm text-primary font-medium">
                    {item.amount}
                  </span>
                  <span className="text-sm text-muted-foreground w-14 text-right">
                    {item.percentage}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
