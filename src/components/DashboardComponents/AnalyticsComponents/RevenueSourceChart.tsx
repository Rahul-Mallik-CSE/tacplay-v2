"use client"

/**
 * RevenueSourceChart.tsx
 * Donut chart showing revenue sources using recharts PieChart.
 */

import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { RevenueSourceItem } from "@/types/DashboardTypes/ArenaManagementTypes"

interface RevenueSourceChartProps {
  data: RevenueSourceItem[]
}

export default function RevenueSourceChart({ data }: RevenueSourceChartProps) {
  const { t } = useTranslation("dashboard")
  const [timeRange, setTimeRange] = useState("Week")

  const totalCheckIn = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-primary">
          {t("analytics.revenueSource")}
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
        >
          <option value="Week">{t("analytics.week")}</option>
          <option value="Month">{t("analytics.month")}</option>
          <option value="Day">{t("analytics.day")}</option>
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
            <span className="text-2xl font-bold text-primary">{totalCheckIn}</span>
            <span className="text-xs text-muted-foreground">{t("analytics.checkIn")}</span>
          </div>
        </div>

        <div className="w-full mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-primary">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-primary font-medium">{item.amount}</span>
                <span className="text-sm text-muted-foreground w-12 text-right">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
