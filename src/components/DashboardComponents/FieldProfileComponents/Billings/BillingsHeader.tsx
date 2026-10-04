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
  onFilterClick,
  activeFilterCount = 0,
  totalRevenueDisplay,
}: BillingsHeaderProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {t("arena.billingsTab.title", "Billings & Earnings")}
        </h2>
        {totalRevenueDisplay && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="text-muted-foreground font-normal">Revenue:</span>
            {totalRevenueDisplay}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("common.search", "Search...")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
        </div>
        <button
          onClick={onFilterClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
            activeFilterCount > 0
              ? "bg-custom-red text-white border-custom-red"
              : "bg-input/30 text-primary hover:bg-secondary/50 border-white/10"
          }`}
        >
          <Funnel className="w-4 h-4" />
          <span>{t("arena.billingsTab.filter", "Filter")}</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-custom-red text-xs font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
