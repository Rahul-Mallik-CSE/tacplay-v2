"use client"

import React from "react"
import { Calendar, Download, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"

interface OverviewHeaderProps {
  title?: string
  subtitle?: string
  selectedYear?: number | null
  availableYears?: number[]
  exportAvailable?: boolean
  onYearChange?: (year: number) => void
  onExport?: () => void
  isExporting?: boolean
}

export default function OverviewHeader({
  title,
  subtitle,
  selectedYear,
  availableYears = [2026],
  exportAvailable = true,
  onYearChange,
  onExport,
  isExporting = false,
}: OverviewHeaderProps) {
  const { t } = useTranslation("dashboard")

  const years = availableYears.length > 0 ? availableYears : [selectedYear || 2026]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {title || t("analytics.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {subtitle || t("analytics.subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center px-3 py-2 rounded-lg border border-white/10 bg-input/30 text-sm text-primary hover:bg-input/50 transition-colors">
          <Calendar className="w-4 h-4 mr-2 text-muted-foreground pointer-events-none" />
          <select
            value={selectedYear || years[0]}
            onChange={(e) => onYearChange?.(Number(e.target.value))}
            className="bg-transparent text-sm font-medium text-primary outline-none cursor-pointer pr-4 appearance-none"
          >
            {years.map((year) => (
              <option key={year} value={year} className="bg-card text-primary">
                {year}
              </option>
            ))}
          </select>
          <svg
            className="w-4 h-4 pointer-events-none text-muted-foreground ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {exportAvailable && (
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {t("analytics.exportReport")}
          </button>
        )}
      </div>
    </div>
  )
}
