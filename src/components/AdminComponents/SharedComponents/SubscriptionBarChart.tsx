"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import type { SubscriptionChartData } from "@/types/AdminTypes/AnalyticsTypes"

interface SubscriptionBarChartProps {
  data: SubscriptionChartData[]
  title?: string
}

export default function SubscriptionBarChart({
  data,
  title,
}: SubscriptionBarChartProps) {
  const { t } = useTranslation("dashboard")
  const [timeRange, setTimeRange] = useState("Day")

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {title || t("adminAnalytics.subscriptionChart")}
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
        >
          <option value="Day">{t("adminAnalytics.day")}</option>
          <option value="Week">{t("adminAnalytics.week")}</option>
          <option value="Month">{t("adminAnalytics.month")}</option>
        </select>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-custom-yellow" />
          <span className="text-sm text-muted-foreground">
            {t("adminAnalytics.field")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-custom-red" />
          <span className="text-sm text-muted-foreground">
            {t("adminAnalytics.player")}
          </span>
        </div>
      </div>
      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.3)"
              tick={{
                fill: "rgba(255,255,255,0.5)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              tick={{
                fill: "rgba(255,255,255,0.5)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar
              dataKey="field"
              fill="#EAB308"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="player"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
