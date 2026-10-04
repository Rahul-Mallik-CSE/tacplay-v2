"use client"

import React from "react"
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
import type { RevenueOverTimeSection } from "@/types/DashboardTypes/AnalyticsTypes"

interface RevenueOverTimeChartProps {
  section?: RevenueOverTimeSection | null
  periodOptions?: string[]
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
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

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; payload: { label: string; rawValue: string; changeDisplay?: string; isPositive?: boolean } }>
  label?: string
  currencySymbol?: string
}

const CustomTooltip = ({ active, payload, currencySymbol = "€" }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    const value = item.value
    const change = item.payload.changeDisplay
    const isPositive = item.payload.isPositive

    return (
      <div className="bg-card/95 border border-white/10 text-primary px-3.5 py-2.5 rounded-lg shadow-xl text-xs backdrop-blur-md">
        <p className="font-semibold text-secondary mb-1">{item.payload.label}</p>
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm text-primary">
            {currencySymbol} {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {change && (
            <span className={`font-medium ${isPositive ? "text-emerald-400" : "text-custom-red"}`}>
              ({change})
            </span>
          )}
        </div>
      </div>
    )
  }
  return null
}

export default function RevenueOverTimeChart({
  section,
  periodOptions = ["day", "week", "month", "year"],
  selectedPeriod,
  onPeriodChange,
}: RevenueOverTimeChartProps) {
  const { t } = useTranslation("dashboard")

  const currentPeriod = selectedPeriod || section?.period || "month"
  const currencySymbol = getCurrencySymbol(section?.currency)

  const chartData = (section?.items || []).map((item) => ({
    label: item.label,
    revenue: parseFloat(String(item.value)) || 0,
    rawValue: String(item.value),
    changeDisplay: item.change?.display,
    isPositive: item.change?.is_positive,
  }))

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="rounded-xl border border-white/5 bg-card/60 backdrop-blur-xs p-4 sm:p-6 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {section?.title || t("analytics.revenueOverTime", "Revenue Over Time")}
          </h3>
          <p className="text-xs text-secondary mt-0.5">
            {section?.currency ? `Currency: ${section.currency}` : "Revenue trend analysis"}
          </p>
        </div>

        <select
          value={currentPeriod}
          onChange={(e) => onPeriodChange?.(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-white/20 transition-colors"
          aria-label="Revenue period"
        >
          {periodOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-card text-primary">
              {capitalize(opt)}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-secondary">
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) =>
                  val >= 1000 ? `${currencySymbol}${(val / 1000).toFixed(0)}k` : `${currencySymbol}${val}`
                }
              />
              <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#EF4444"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={{ r: 3, fill: "#EF4444", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#EF4444", stroke: "#FFFFFF", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
