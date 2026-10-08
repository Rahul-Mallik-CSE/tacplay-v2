"use client"

import React from "react"
import { Calendar, Download, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { AdminAnalyticsFilterMonth } from "@/types/AdminTypes/AnalyticsTypes"

interface AnalyticsHeaderProps {
  selectedYear: number
  selectedMonth: number
  yearOptions?: number[]
  monthOptions?: AdminAnalyticsFilterMonth[]
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
  onExportReport?: () => void
  isExporting?: boolean
  title?: string
  subtitle?: string
}

const DEFAULT_MONTHS: AdminAnalyticsFilterMonth[] = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
]

export default function AnalyticsHeader({
  selectedYear,
  selectedMonth,
  yearOptions = [2025, 2026, 2027],
  monthOptions = [],
  onYearChange,
  onMonthChange,
  onExportReport,
  isExporting = false,
  title,
  subtitle,
}: AnalyticsHeaderProps) {
  const { t } = useTranslation("dashboard")

  const months = monthOptions.length > 0 ? monthOptions : DEFAULT_MONTHS
  const years = yearOptions.length > 0 ? yearOptions : [2025, 2026, 2027]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
          {title || t("analytics.title", "Analytics report")}
        </h1>
        <p className="text-sm text-secondary mt-1">
          {subtitle || t("analytics.subtitle", "Platform-wide performance, revenue, subscriptions & campaign insights.")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Month Selector */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="appearance-none bg-card border border-white/10 text-primary text-xs sm:text-sm font-medium rounded-lg pl-3 pr-8 py-2.5 outline-none cursor-pointer hover:border-white/20 transition-colors focus:ring-1 focus:ring-custom-yellow/50"
            aria-label="Select Month"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value} className="bg-card text-primary">
                {m.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Year Selector */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="appearance-none bg-card border border-white/10 text-primary text-xs sm:text-sm font-medium rounded-lg pl-8 pr-8 py-2.5 outline-none cursor-pointer hover:border-white/20 transition-colors focus:ring-1 focus:ring-custom-yellow/50"
            aria-label="Select Year"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-card text-primary">
                {y}
              </option>
            ))}
          </select>
          <Calendar className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Export Report Button */}
        <button
          type="button"
          onClick={onExportReport}
          disabled={isExporting}
          className="flex cursor-pointer items-center gap-2 px-4 py-2.5 bg-custom-red text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-custom-red/90 transition-colors shrink-0 disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {t("analytics.exportReport", "Export Report")}
        </button>
      </div>
    </div>
  )
}
