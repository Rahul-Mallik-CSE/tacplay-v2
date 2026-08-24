"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import type { RevenueOverTimeData } from "@/types/AdminTypes/AnalyticsTypes"

interface RevenueAreaChartProps {
  data: RevenueOverTimeData[]
  title?: string
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) => {
  if (active && payload && payload.length) {
    const value = payload[0].value
    return (
      <div className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-bold">${value.toLocaleString()}</p>
        <p className="text-emerald-500 text-xs">(+4.3%)</p>
      </div>
    )
  }
  return null
}

export default function RevenueAreaChart({
  data,
  title,
}: RevenueAreaChartProps) {
  const { t } = useTranslation("dashboard")
  const [timeRange, setTimeRange] = useState("Month")

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {title || t("adminAnalytics.revenueOverTime")}
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
        >
          <option value="Month">{t("adminAnalytics.month")}</option>
          <option value="Week">{t("adminAnalytics.week")}</option>
          <option value="Day">{t("adminAnalytics.day")}</option>
        </select>
      </div>
      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="revenueGradientAdmin"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#EF4444"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="#EF4444"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) =>
                `${value >= 1000 ? `${value / 1000}k` : value}`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#revenueGradientAdmin)"
              dot={{ r: 4, fill: "#EF4444", strokeWidth: 0 }}
              activeDot={{
                r: 6,
                fill: "#EF4444",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
