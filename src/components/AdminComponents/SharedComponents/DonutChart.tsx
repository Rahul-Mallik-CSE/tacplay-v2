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
}

export default function DonutChart({
  data,
  title,
  centerLabel,
  centerSubLabel,
  defaultTimeRange = "Week",
}: DonutChartProps) {
  const { t } = useTranslation("dashboard")
  const [timeRange, setTimeRange] = useState(defaultTimeRange)

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {title}
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
        >
          <option value="Week">{t("adminAnalytics.week")}</option>
          <option value="Month">{t("adminAnalytics.month")}</option>
          <option value="Day">{t("adminAnalytics.day")}</option>
        </select>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {centerLabel || totalValue.toLocaleString()}
            </span>
            {centerSubLabel && (
              <span className="text-xs text-muted-foreground">
                {centerSubLabel}
              </span>
            )}
          </div>
        </div>

        <div className="w-full mt-6 space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-primary">{t(item.name)}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-primary font-medium">
                  {item.amount}
                </span>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {item.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
