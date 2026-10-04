"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import type { BookingVsCheckinsSection } from "@/types/DashboardTypes/AnalyticsTypes"

interface BookingVsCheckinsChartProps {
  section?: BookingVsCheckinsSection | null
  periodOptions?: string[]
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ dataKey: string; value: number; name: string; fill: string }>
  label?: string
}

const CustomBarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-white/10 text-primary px-3.5 py-2.5 rounded-lg shadow-xl text-xs backdrop-blur-md">
        <p className="font-semibold text-secondary mb-1.5">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                {entry.name}
              </span>
              <span className="font-bold text-primary">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function BookingVsCheckinsChart({
  section,
  periodOptions = ["day", "week", "month", "year"],
  selectedPeriod,
  onPeriodChange,
}: BookingVsCheckinsChartProps) {
  const { t } = useTranslation("dashboard")

  const currentPeriod = selectedPeriod || section?.period || "day"
  const bookingsLabel = section?.legend?.bookings || t("analytics.bookings", "Bookings")
  const checkinsLabel = section?.legend?.check_ins || t("analytics.checkins", "Check-ins")

  const chartData = (section?.items || []).map((item) => ({
    label: item.label,
    Bookings: item.bookings,
    "Check-ins": item.check_ins,
  }))

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="rounded-xl border border-white/5 bg-card/60 backdrop-blur-xs p-4 sm:p-6 flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {section?.title || t("analytics.bookingVsCheckins", "Booking vs Check-ins")}
          </h3>

          <select
            value={currentPeriod}
            onChange={(e) => onPeriodChange?.(e.target.value)}
            className="bg-muted border border-white/10 text-primary text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-white/20 transition-colors"
            aria-label="Booking vs Checkins period"
          >
            {periodOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-card text-primary">
                {capitalize(opt)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-custom-yellow" />
            <span className="text-xs text-secondary font-medium">{bookingsLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-custom-red" />
            <span className="text-xs text-secondary font-medium">{checkinsLabel}</span>
          </div>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-secondary">
            No booking activity recorded
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="Bookings"
                fill="#EAB308"
                radius={[4, 4, 0, 0]}
                barSize={10}
              />
              <Bar
                dataKey="Check-ins"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                barSize={10}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
