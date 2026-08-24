"use client"

import { Calendar, Download } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function OverviewHeader() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {t("analytics.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("analytics.subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-input/30 text-sm text-primary cursor-pointer hover:bg-input/50 transition-colors">
          <Calendar className="w-4 h-4" />
          <span>2025 - 2026</span>
          <svg
            className="w-4 h-4"
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
        <button className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/90 transition-colors">
          <Download className="w-4 h-4" />
          {t("analytics.exportReport")}
        </button>
      </div>
    </div>
  )
}
