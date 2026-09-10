"use client"

/**
 * BillingsHeader.tsx
 * Header row with title, search input, and filter button for billing records.
 * Used as part of the BillingsTab component.
 */

import { Search, Funnel } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { BillingsHeaderProps } from "@/types/DashboardTypes/ArenaManagementTypes"

export default function BillingsHeader({
  search,
  onSearchChange,
}: BillingsHeaderProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 className="text-xl sm:text-2xl font-bold text-primary">
        {t("arena.billingsTab.title")}
      </h2>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-input/30 text-primary rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors cursor-pointer border border-white/10">
          <Funnel className="w-4 h-4" />
          {t("arena.billingsTab.filter")}
        </button>
      </div>
    </div>
  )
}
